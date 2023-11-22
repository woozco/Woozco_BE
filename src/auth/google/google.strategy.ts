import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { config } from "dotenv";

import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GoogleUser } from "./entity/googleUser.entity";
import { GoogleService } from "./google.service";

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
    constructor(
        @InjectRepository(GoogleUser)
        private readonly googleUserRepository: Repository<GoogleUser>,
        private readonly googleService: GoogleService
    ) {
        super({
            clientID: process.env.OAUTH_GOOGLE_ID,
            clientSecret: process.env.OAUTH_GOOGLE_SECRET,
            callbackURL: process.env.OAUTH_GOOGLE_REDIRECT,
            scope: ["email", "profile"],
        });
    }

    authorizationParams(): { [key: string]: string } {
        return {
            access_type: "offline",
        };
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
    ): Promise<any> {
        const { name, emails, photos } = profile;
        const user = await this.googleUserRepository.findOne({
            where: { email: emails[0].value },
        });

        if (user) {
            user.firstName = name.familyName;
            user.lastName = name.givenName;
            user.picture = photos[0].value;
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;

            await this.googleUserRepository.save(user);
        } else {
            const newUser = this.googleUserRepository.create({
                email: emails[0].value,
                firstName: name.familyName,
                lastName: name.givenName,
                accessToken,
                refreshToken,
            });

            await this.googleUserRepository.save(newUser);
        }
        const jwtToken = this.googleService.createJwtToken(user); // AuthService에서 createJwtToken 메서드를 구현해서 사용

        console.log("accessToken: ");
        console.log(accessToken);
        console.log("refreshToken: ");
        console.log(refreshToken);
        console.log("jwt");
        console.log(jwtToken);

        done(null, { user, jwtToken });
    }
}

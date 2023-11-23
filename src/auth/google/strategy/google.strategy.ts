import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { config } from "dotenv";

import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GoogleUser } from "../entity/googleUser.entity";
import { GoogleService } from "../google.service";
import { payloadDTO } from "../dto/google.user.dto";

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

        let user = await this.googleUserRepository.findOne({
            where: { email: emails[0].value },
        });

        const iatGenerate = Math.floor(Date.now() / 1000);
        const expGenerate = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 14; //14day

        if (user) {
            user.firstName = name.familyName;
            user.lastName = name.givenName;
            user.picture = photos[0].value;
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            user.iat = iatGenerate;
            user.exp = expGenerate;

            await this.googleUserRepository.save(user);
        } else {
            const newUser = this.googleUserRepository.create({
                email: emails[0].value,
                firstName: name.familyName,
                lastName: name.givenName,
                accessToken,
                refreshToken,
                iat: iatGenerate,
                exp: expGenerate,
            });

            user = await this.googleUserRepository.save(newUser);
        }

        let outerUser = new payloadDTO()
            .setId(user.id)
            .setEmail(user.email)
            .setAccessToken(user.accessToken);

        const jwtToken = this.googleService.createJwtToken(outerUser); // AuthService에서 createJwtToken 메서드를 구현해서 사용

        done(null, { user, jwtToken });
    }
}

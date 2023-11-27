// google-access.strategy.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { GoogleService } from "../google.service";
import { payloadDTO } from "../dto/google.user.dto";

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
    Strategy,
    "jwt-access"
) {
    constructor(private authService: GoogleService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: payloadDTO) {
        const user = await this.authService.validateUserFromAccessToken(
            payload
        );
        console.log(user)
        if (!user) {
            console.log("access")
            throw new UnauthorizedException();
        }
        return user;
    }
}

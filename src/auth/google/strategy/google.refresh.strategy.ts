import { Injectable, UnauthorizedException,NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { GoogleService } from "../google.service";
import { payloadDTO } from "../dto/google.user.dto";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
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
        const user = await this.authService.validateUserFromRefreshToken(
            payload
        );
        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }
}

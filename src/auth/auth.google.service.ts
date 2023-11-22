import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class GoogleAuthService {
    constructor(
    ) {}

    async googleLogin(req) {
        if (!req.user) {
            return "No user from google";
        }

        return {
            message: "User information from google",
            user: req.user,
        };
    }
}

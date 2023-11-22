import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class GoogleService {
    constructor(private readonly jwtService: JwtService) {}

    createJwtToken(user: any): string {
        const payload = {
            sub: user.id,
            email: user.email,
            accessToken: user.accessToken,
        };
        return this.jwtService.sign(payload);
    }

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

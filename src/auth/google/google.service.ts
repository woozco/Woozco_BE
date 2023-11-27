import {
    Injectable,
    NotFoundException,
    Response,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { payloadDTO } from "./dto/google.user.dto";
import { GoogleUser } from "./entity/googleUser.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class GoogleService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(GoogleUser)
        private readonly googleUserRepository: Repository<GoogleUser>
    ) {}

    createJwtToken(user: payloadDTO): string {
        const plainUser = { ...user };
        return this.jwtService.sign(plainUser);
    }

    async googleLogin(req) {
        if (!req.user) {
            return "No user from google";
        }

        return req.user;
    }

    async validateUserFromAccessToken(payload: payloadDTO) {
        let user = await this.googleUserRepository.findOne({
            where: { id: payload.id },
        });

        if (!user) {
            console.log("validateUserFromAccessToken: user");
            throw new NotFoundException("User not found");
        }

        if (user.accessToken !== payload.accessToken) {
            console.log("validateUserFromAccessToken: Invalid access token");
            throw new UnauthorizedException("Invalid access token");
        }

        return user; // user랑 동일
    }

    async validateUserFromRefreshToken(payload: payloadDTO) {
        let user = await this.googleUserRepository.findOne({
            where: { id: payload.id },
        });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        if (user.refreshToken) {
            throw new UnauthorizedException("Invalid access token");
        }
        const current = Math.floor(Date.now() / 1000);

        if (current > user.exp) {
            return;
        }

        return payload;
    }
}

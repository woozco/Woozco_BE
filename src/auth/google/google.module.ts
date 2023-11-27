import { Module } from "@nestjs/common";
import { GoogleController } from "./google.controller";
import { GoogleService } from "./google.service";
import { PassportModule } from "@nestjs/passport";
import { GoogleStrategy } from "./strategy/google.strategy";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GoogleUser } from "./entity/googleUser.entity";
import { ConfigService } from "@nestjs/config";
import { JwtAccessStrategy } from "./strategy/google.access.strategy";
import { JwtRefreshStrategy } from "./strategy/google.refresh.strategy";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "google" }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: "30m", issuer: "google" },
            }),
        }),
        TypeOrmModule.forFeature([GoogleUser]),
    ],
    controllers: [GoogleController],
    providers: [
        GoogleService,
        GoogleStrategy,
        JwtAccessStrategy,
        JwtRefreshStrategy,
    ],
})
export class GoogleModule {}

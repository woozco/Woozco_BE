import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { GoogleModule } from './google/google.module';

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: "30m" },
            }),
        }),
        GoogleModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}

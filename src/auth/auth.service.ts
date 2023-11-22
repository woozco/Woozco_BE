import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcryptjs";
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async register(createUserDto: CreateUserDto) {
        const salt = await bcrypt.genSalt();
        createUserDto.password = await bcrypt.hash(
            createUserDto.password,
            salt
        );
        this.usersService.insert(createUserDto);
        return "Add user " + createUserDto.name;
    }

    async login(loginDto: LoginDto) {
        const email = loginDto.email;
        const password = loginDto.password;

        const user = await this.usersService.findOne(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { sub: user.email, username: user.name };
            return {
                access_token: await this.jwtService.signAsync(payload, {
                    expiresIn: "30m",
                }),
            };
        } else {
            throw new UnauthorizedException();
        }
    }

    async changePW(loginDto: LoginDto) {
        const user = await this.usersService.findOne(loginDto.email);
        const salt = await bcrypt.genSalt();
        loginDto.password = await bcrypt.hash(loginDto.password, salt);
        this.usersService.update(user.id, loginDto);
        return "Change password for " + user.name;
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

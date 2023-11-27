import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { Verify } from './entities/verify.entity';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { VerifyDto } from './dto/verify.dto';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcryptjs";
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Verify)
        private readonly verifyRepository: Repository<Verify>,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService
    ) { }
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
        return 'Change password for ' + user.name; 
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
    
    async confirmVerifyCode(verifyCode: number) {
        const result: Verify = await this.verifyRepository.findOneBy({verifyCode});
        if(!result) {
            throw new NotFoundException();
        }
        else if(result.verifyCode != verifyCode) {
            return '인증번호를 다시 확인해주세요.'
        }
        else {
            this.verifyRepository.delete({verifyCode})
            return '이메일 인증 완료';
        }
    }

    async sendVerifyCode(email: string) {
        const verifyCode: number = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        let verify: VerifyDto = {email, verifyCode};
        this.verifyRepository.insert(verify);
        return this.mailService.sendMail(verify, true);
    }
}
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { CustomAuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("api/auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post("register")
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @UseGuards(CustomAuthGuard)
    @Post("changepw")
    changePW(@Request() req) {
        const loginDto: LoginDto = {
            email: req.user.sub,
            password: req.body.password,
        };
        return this.authService.changePW(loginDto);
    }

    @UseGuards(CustomAuthGuard)
    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('verifyemail')
    verifyEmail(@Body('email') email: string) {
        return this.authService.sendVerifyCode(email);
    }

    @Post('confirm-verifyemail')
    confirmVerifyEmail(@Body('verifyCode') verifyCode: number) {
        return this.authService.confirmVerifyCode(verifyCode);
    }
}


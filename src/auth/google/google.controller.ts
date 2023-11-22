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
import { GoogleService } from "./google.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("api/auth/google")
export class GoogleController {
    constructor(private googleService: GoogleService) {}
    @Get("/")
    @UseGuards(AuthGuard("google"))
    async googleAuth(@Request() req) {
        console.log(req)
    }

    @Get("/redirect")
    @UseGuards(AuthGuard("google"))
    googleAuthRedirect(@Request() req) {
        return this.googleService.googleLogin(req);
    }
}

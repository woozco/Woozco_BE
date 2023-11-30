import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    Response,
    UseGuards,
} from "@nestjs/common";
import { GoogleService } from "./google.service";
import { AuthGuard } from "@nestjs/passport";
import { GoogleAccessTokenGuard } from "./google.guard";

@Controller("api/auth/google")
export class GoogleController {
    constructor(private googleService: GoogleService) {}
    @Get("/")
    @UseGuards(AuthGuard("google"))
    async googleAuth(@Request() req) {
        console.log(req);
    }

    @Get("/redirect")
    @UseGuards(AuthGuard("google"))
    async googleAuthRedirect(@Request() req, @Response() res) {
        //const token = await this.googleService.googleLogin(req);
        const userJson = JSON.stringify(req.user);
        res.cookie("jwt", userJson);
        res.redirect("http://localhost:8080/success"); // 클라이언트 페이지로 리다이렉트
    }

    @Get("/protected")
   // @UseGuards(GoogleAccessTokenGuard)
    getProtectedResource() {
      return { message: "This is a protected resource" };
    }
}

import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleAccessTokenGuard extends AuthGuard("jwt-access") {}

@Injectable()
export class GoogleRefreshTokenGuard extends AuthGuard("jwt-refresh") {}

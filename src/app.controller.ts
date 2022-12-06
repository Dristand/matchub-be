import {Controller, Request, Post, UseGuards, Get} from '@nestjs/common';
import {LocalAuthGuard} from "./auth/guard/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/guard/jwt-auth.guard";

@Controller()
export class AppController {
    constructor(private authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<any> {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('jwt')
    async helloJwt(@Request() req): Promise<any> {
        return req.user;
    }
}
import {Controller, Request, Post, UseGuards, Get, Body} from '@nestjs/common';
import {LocalAuthGuard} from "./auth/guard/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/guard/jwt-auth.guard";
import {UserCreateDto} from "./users/dto/user.create.dto";

@Controller()
export class AppController {
    constructor(private authService: AuthService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('jwt')
    async helloJwt(@Request() req): Promise<any> {
        return req.user;
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<any> {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() userCreateDto: UserCreateDto): Promise<any> {
        console.log(userCreateDto);

        return await this.authService.register(userCreateDto);
    }
}
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import {LocalAuthGuard} from "./auth/local-auth.guard";

@Controller()
export class AppController {
    constructor() {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<any> {
        return req.user;
    }
}
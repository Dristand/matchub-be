import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
                private jwtService: JwtService) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne({where: {email: email}});

        await bcrypt.hash(password, user.passwordSalt);
        const isMatch = await bcrypt.compare(password, user.password);

        if (user && isMatch) {
            const {password, ...rest} = user;

            return rest;
        }

        return null;
    }

    async login(user: any) {
        const payload = {email: user.email, sub: user.id};

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}

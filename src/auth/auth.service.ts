import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private jwtService: JwtService) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        console.log(user);

        // TODO: Encrypt the password with hash
        if (user && user.password === password) {
            const {password, email, ...rest} = user;

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

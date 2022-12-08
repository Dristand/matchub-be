import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {UserCreateDto} from "../users/dto/user.create.dto";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
                private jwtService: JwtService) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne({where: {email: email}});

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

    async register(userCreateDto: UserCreateDto): Promise<any> {
        let response: number = 200;

        // TODO: implement response for error
        try {
            response = await this.usersService.createUser(userCreateDto);
        } catch (err) {
            return 400;
        }

        return response;
    }
}

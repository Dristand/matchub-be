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

    /**
     * validateUser using bcrypt comparison for hashing the password.
     *
     * @param email
     * @param password
     */
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne({where: {email: email}});

        const isMatch = await bcrypt.compare(password, user.password);

        if (user && isMatch) {
            const {password, ...rest} = user;

            return rest;
        }

        return null;
    }

    /**
     * Login method given user request
     *
     * @param user
     * @return jwt token of the user
     */
    async login(user: any) {
        const payload = {email: user.email, sub: user.id};

        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    /**
     * Register user based on validated UserCreateDto
     *
     * @param userCreateDto
     */
    async register(userCreateDto: UserCreateDto): Promise<any> {
        return await this.usersService.createUser(userCreateDto);
    }
}

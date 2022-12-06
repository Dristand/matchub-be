import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {
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
}

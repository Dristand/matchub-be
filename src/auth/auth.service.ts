import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {UserCreateDto} from "../users/dto/user.create.dto";
import {User} from "../users/user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class AuthService {
    private userRepository: Repository<User>;

    constructor(@InjectRepository(User) userRepo,
                private usersService: UsersService,
                private jwtService: JwtService) {
        this.userRepository = userRepo;
    }

    /**
     * validateUser using bcrypt comparison for hashing the password.
     *
     * @param email
     * @param password
     */
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({where: {email: email}});

        if (user == null) {
            throw new HttpException("User with given email not found", HttpStatus.BAD_REQUEST);
        }

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
        const payload = {email: user.email, userId: user.id, fullName: user.fullName};

        return {
            access_token: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '2w',
            }),
        }
    }

    /**
     * Register user based on validated UserCreateDto
     *
     * @param userCreateDto
     */
    async register(userCreateDto: UserCreateDto): Promise<User> {
        return await this.usersService.createUser(userCreateDto);
    }
}

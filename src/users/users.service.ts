import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UserCreateDto} from "./dto/user.create.dto";

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {

    constructor(@InjectRepository(User) repo) {
        super(repo);
    }

    async createUser(userCreate: UserCreateDto): Promise<number> {
        const {studentId, fullName, email, password} = userCreate;
        let user: User;

        // check if email used already
        user = await this.repo.findOne({where: {email: email}});
        if (user != null) {
            // TODO: return response with proper message
            throw new HttpException('Email is already being used by another user', HttpStatus.BAD_REQUEST);
        }

        // check if studentId used already
        user = await this.repo.findOne({where: {studentId: studentId}});
        if (user != null) {
            // TODO: return response with proper message
            throw new HttpException('Student ID is already being used by another user', HttpStatus.BAD_REQUEST);
        }

        user = this.fillUserEntity(studentId, fullName, email, password)
        await this.repo.save(user);

        return 200;
    }

    private fillUserEntity(studentId, fullName, email, password): User {
        const user: User = new User();

        user.studentId = studentId;
        user.fullName = fullName;
        user.email = email;
        user.password = password;

        return user;
    }
}

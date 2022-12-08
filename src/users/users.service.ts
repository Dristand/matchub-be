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

    /**
     * Creates user based on given dto, check for existing data for email and studentId
     *
     * @param userCreateDto dto for creating user (studentId, fullName, email, password)
     * @return response
     */
    async createUser(userCreateDto: UserCreateDto): Promise<number> {
        const {studentId, fullName, email, password} = userCreateDto;
        let user: User;

        // check if email used already
        user = await this.repo.findOne({where: {email: email}});
        if (user != null) {
            throw new HttpException('Email is already being used by another user', HttpStatus.BAD_REQUEST);
        }

        // check if studentId used already
        user = await this.repo.findOne({where: {studentId: studentId}});
        if (user != null) {
            throw new HttpException('Student ID is already being used by another user', HttpStatus.BAD_REQUEST);
        }

        user = this.fillUserEntity(studentId, fullName, email, password)
        await this.repo.save(user);

        return 200;
    }

    /**
     * Create user entity given mandatory parameter
     *
     * @param studentId
     * @param fullName
     * @param email
     * @param password
     *
     * @return Completed User entity
     */
    private fillUserEntity(studentId, fullName, email, password): User {
        const user: User = new User();

        user.studentId = studentId;
        user.fullName = fullName;
        user.email = email;
        user.password = password;

        return user;
    }
}

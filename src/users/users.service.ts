import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {

    constructor(@InjectRepository(User) repo) {
        super(repo);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.repo.findOne({where: {email: email}});
    }
}

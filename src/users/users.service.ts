import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ClubApplication} from "../club-application/club-application.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
    private clubApplicationRepository: Repository<ClubApplication>;

    constructor(@InjectRepository(User) repo,
                @InjectRepository(ClubApplication) clubAppRepo) {
        super(repo);
        this.clubApplicationRepository = clubAppRepo;
    }

    async ClubApplicationList(studentId): Promise<ClubApplication[]> {
        const studentUser: User = await this.repo.findOneBy({id: studentId})

        if (studentUser == null) {
            return [];
        }
        console.log("aa", studentUser);

        return await this.clubApplicationRepository.find({where: {user: studentUser}, relations: ['club', 'user']});
    }
}

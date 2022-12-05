import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {Club} from "./club.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ClubApplication} from "../club-application/club-application.entity";
import {Repository} from "typeorm";
import {User} from "../users/user.entity";

@Injectable()
export class ClubService extends TypeOrmCrudService<Club> {
    private clubApplicationRepository: Repository<ClubApplication>;
    private userRepository: Repository<User>;

    constructor(@InjectRepository(Club) clubRepo,
                @InjectRepository(ClubApplication) clubAppRepo,
                @InjectRepository(User) userRepo) {
        super(clubRepo);
        this.clubApplicationRepository = clubAppRepo;
        this.userRepository = userRepo;
    }

    async AvailableClubList(studentId): Promise<Club[]> {
        let clubList: Club[];
        let clubApplicationList: ClubApplication[];
        let studentUser: User;

        clubList = await this.repo.find();
        // TODO: empty handler
        studentUser = await this.userRepository.findOneBy({id: studentId})

        clubApplicationList = await this.clubApplicationRepository
                                    .findBy({user: studentUser});

        this.ClearAppliedClub(clubList, clubApplicationList);

        return clubList;
    }

    ClearAppliedClub(clubList, clubApplicationList){
        // TODO: Create better runtime method
        clubApplicationList.forEach((clubApplication) => {
            clubList.filter((club) => club.id != clubApplication.club.id)
        })
    }
}

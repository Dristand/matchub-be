import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {Club} from "./club.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ClubApplication} from "../club-application/club-application.entity";
import {Repository} from "typeorm";
import {User} from "../users/user.entity";

@Injectable()
export class ClubService extends TypeOrmCrudService<Club> {
    private AppliedKeyword: string = "applied";
    private AvailableKeyword: string = "available";

    private clubApplicationRepository: Repository<ClubApplication>;
    private userRepository: Repository<User>;

    constructor(@InjectRepository(Club) repo,
                @InjectRepository(ClubApplication) clubAppRepo,
                @InjectRepository(User) userRepo) {
        super(repo);
        this.clubApplicationRepository = clubAppRepo;
        this.userRepository = userRepo;
    }

    /**
     * Return ClubList requested by student based on its status (applied/available club)
     *
     * @param studentId: number
     * @param status: string (const on class attribute)
     * @return list of Club
     */
    async getClubListForStudent(studentId, status): Promise<Club[]> {
        const studentUser: User = await this.userRepository.findOneBy({id: studentId})

        if (studentUser == null) {
            return [];
        }

        const clubApplication: ClubApplication[] = await this.clubApplicationRepository.find({
            where: {user: {id: studentId}},
            relations: {
                club: true,
                user: true,
            }
        })

        const clubList: Club[] = await this.repo.find();
        const result: Club[] = [];

        for (let club of clubList) {
            let applied: boolean = false;

            for (let clubApp of clubApplication) {
                if (clubApp.club.id == club.id) {
                    applied = true;
                    break;
                }
            }

            if (status === this.AvailableKeyword && !applied) result.push(club);
            if (status === this.AppliedKeyword && applied) result.push(club);
        }

        return result;
    }
}

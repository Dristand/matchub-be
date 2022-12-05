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

    constructor(@InjectRepository(Club) repo,
                @InjectRepository(ClubApplication) clubAppRepo,
                @InjectRepository(User) userRepo) {
        super(repo);
        this.clubApplicationRepository = clubAppRepo;
        this.userRepository = userRepo;
    }

    async AvailableClubList(studentId): Promise<Club[]> {
        const studentUser: User = await this.userRepository.findOneBy({id: studentId})

        if (studentUser == null) {
            return [];
        }
        console.log(studentUser);

        // TODO: Optimize this
        // const clubList: Club[] = await this.repo
        //     .createQueryBuilder('club')
        //     .leftJoinAndSelect(
        //         (builder) => builder.select().from(ClubApplication, 'ca')
        //             .where('ca.user_id = :userId', {userId: studentUser.id})
        //         , 'clubApplication', '"clubApplication"."club_id" = "club"."id"'
        //     )
        //     .getMany();

        const clubApplication: ClubApplication[] = await this.clubApplicationRepository
            .find({where: {user: studentUser}, relations: ['club']})
        console.log(clubApplication[0].club)

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

            if (!applied) result.push(club);
        }

        return result;
    }
}

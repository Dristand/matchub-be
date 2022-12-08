import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {ClubApplication} from "./club-application.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Club} from "../club/club.entity";
import {Repository} from "typeorm";
import {User} from "../users/user.entity";

@Injectable()
export class ClubApplicationService extends TypeOrmCrudService<ClubApplication> {
    private clubRepository: Repository<Club>;
    private userRepository: Repository<User>;

    constructor(@InjectRepository(ClubApplication) repo,
                @InjectRepository(Club) clubRepo,
                @InjectRepository(User) userRepo) {
        super(repo);
        this.clubRepository = clubRepo;
        this.userRepository = userRepo;
    }

    // TODO: make generalized response/error
    async createApplication(clubApplicationCreateDto): Promise<number> {
        const {clubId, studentId} = clubApplicationCreateDto
        const status: number = 200;

        // check if club exists
        const club: Club = await this.clubRepository.findOne({where: {id: clubId}});
        if (club == null) {
            return 404;
        }

        // check if user exists
        const student: User = await this.userRepository.findOne({where: {id: studentId}});
        if (student == null) {
            return 404;
        }

        const clubApplication = this.fillClubApplicationEntity(club, studentId);
        await this.repo.save(clubApplication);

        return status;
    }

    fillClubApplicationEntity(club, student): ClubApplication {
        const clubApplication: ClubApplication = new ClubApplication();
        clubApplication.club = club;
        clubApplication.user = student;

        return clubApplication;
    }
}

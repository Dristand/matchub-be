import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {ClubApplication} from "./club-application.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Club} from "../club/club.entity";
import {Repository} from "typeorm";
import {User} from "../users/user.entity";
import {ClubApplicationCreateDto} from "./dto/club-application.create.dto";

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

    /**
     * Create clubApplication based on validated ClubApplicationCreateDto
     *
     * @param clubApplicationCreateDto
     */
    async createApplication(clubApplicationCreateDto: ClubApplicationCreateDto): Promise<number> {
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

    /**
     * Create clubApplication entity given mandatory parameter
     *
     * @param club
     * @param student
     * @return Completed ClubApplication entity
     */
    fillClubApplicationEntity(club, student): ClubApplication {
        const clubApplication: ClubApplication = new ClubApplication();
        clubApplication.club = club;
        clubApplication.user = student;

        return clubApplication;
    }
}

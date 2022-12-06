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
    async createApplication(clubId, studentId): Promise<number> {
        const status: number = 200;

        const club: Club = await this.clubRepository.findOne({where: {id: clubId}});
        if (club == null) {
            return 404;
        }
        console.log(club);

        const student: User = await this.userRepository.findOne({where: {id: studentId}});
        if (student == null) {
            return 404;
        }

        const clubApplication: ClubApplication = new ClubApplication();
        clubApplication.club = club;
        clubApplication.user = student;
        await this.repo.save(clubApplication);

        return status;
    }
}

import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ClubApplication} from "./club-application.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Club} from "../club/club.entity";
import {Repository} from "typeorm";
import {User} from "../users/user.entity";
import {ClubApplicationCreateDto} from "./dto/club-application.create.dto";

@Injectable()
export class ClubApplicationService {
    private clubRepository: Repository<Club>;
    private clubApplicationRepository: Repository<ClubApplication>;
    private userRepository: Repository<User>;

    constructor(@InjectRepository(ClubApplication) clubAppRepo,
                @InjectRepository(Club) clubRepo,
                @InjectRepository(User) userRepo) {
        this.clubApplicationRepository = clubAppRepo;
        this.clubRepository = clubRepo;
        this.userRepository = userRepo;
    }

    /**
     * Create clubApplication based on validated ClubApplicationCreateDto
     *
     * @param clubApplicationCreateDto
     */
    async createApplication(clubApplicationCreateDto: ClubApplicationCreateDto): Promise<ClubApplication> {
        const {clubId, studentId} = clubApplicationCreateDto;

        // check if club exists
        const club: Club = await this.clubRepository.findOne({where: {id: clubId}});
        if (club == null) {
            throw new HttpException(`Club with id ${clubId} does not exist`, HttpStatus.BAD_REQUEST);
        }

        // check if user exists
        const student: User = await this.userRepository.findOne({where: {id: studentId}});
        if (student == null) {
            throw new HttpException(`User with id ${studentId} does not exist`, HttpStatus.BAD_REQUEST);
        }

        const clubApplication = this.fillClubApplicationEntity(club, student);
        await this.clubApplicationRepository.save(clubApplication);

        delete clubApplication.club.applicantList;
        delete clubApplication.user.password;

        return clubApplication;
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

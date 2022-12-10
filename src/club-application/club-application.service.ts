import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ClubApplication} from "./club-application.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Club} from "../club/club.entity";
import {Repository} from "typeorm";
import {User} from "../users/user.entity";

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
     * @param clubId
     * @param userFromJwt user entity extracted from jwt token
     */
    async createApplication(clubId: number, userFromJwt: User): Promise<ClubApplication> {
        const {id} = userFromJwt;
        const userId = id;

        // check if club exists
        const club: Club = await this.clubRepository.findOne({where: {id: clubId}});
        if (club == null) {
            throw new HttpException(`Club with id ${clubId} does not exist`, HttpStatus.BAD_REQUEST);
        }

        // check if user exists (to be removed when JWT edge cases removal implemented)
        const student: User = await this.userRepository.findOne({where: {id: userId}});
        if (student == null) {
            throw new HttpException(`User with id ${userId} does not exist`, HttpStatus.BAD_REQUEST);
        }

        // check if user applied to the club already
        let clubApplication: ClubApplication = await this.clubApplicationRepository.findOne({
            where: {club: {id: clubId}, user: {id: userId}},
            relations: {
                club: true,
                user: true,
            }
        })
        if (clubApplication != null) {
            throw new HttpException(
                `Club Application with club id ${clubId} and user id ${userId} already exists`,
                HttpStatus.BAD_REQUEST);
        }

        clubApplication = this.fillClubApplicationEntity(club, student);
        await this.clubApplicationRepository.save(clubApplication);

        // remove sensitive information
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

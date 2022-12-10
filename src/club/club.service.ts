import {Injectable} from '@nestjs/common';
import {Club} from "./club.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ClubApplication} from "../club-application/club-application.entity";
import {Repository} from "typeorm";
import {User} from "../users/user.entity";

@Injectable()
export class ClubService {
    private AppliedKeyword: string = "applied";
    private AvailableKeyword: string = "available";

    private clubRepository: Repository<Club>;
    private clubApplicationRepository: Repository<ClubApplication>;
    private userRepository: Repository<User>;

    constructor(@InjectRepository(Club) clubRepo,
                @InjectRepository(ClubApplication) clubAppRepo,
                @InjectRepository(User) userRepo) {
        this.clubRepository = clubRepo;
        this.clubApplicationRepository = clubAppRepo;
        this.userRepository = userRepo;
    }

    /**
     * Return ClubList requested by student based on its status (applied/available club)
     *
     * @param userId: number
     * @param status: string (const on class attribute)
     * @return list of Club
     */
    async getClubListForStudent(userId, status): Promise<Club[]> {
        // check if user exists
        const studentUser: User = await this.userRepository.findOneBy({id: userId})

        if (studentUser == null) {
            return [];
        }

        const clubApplication: ClubApplication[] = await this.clubApplicationRepository.find({
            where: {user: {id: userId}},
            relations: {
                club: true,
                user: true,
            }
        })

        const clubList: Club[] = await this.clubRepository.find();

        return this.filterClubByStatus(
            clubList, clubApplication, status
        );
    }

    /**
     * Search for club that fulfill given status parameter
     *
     * @param clubList
     * @param clubApplication
     * @param status
     * @return list of Club
     */
    filterClubByStatus(clubList: Club[], clubApplication: ClubApplication[], status): Club[] {
        const filteredClub: Club[] = [];

        for (let club of clubList) {
            let applied: boolean = false;

            for (let clubApp of clubApplication) {
                if (clubApp.club.id == club.id) {
                    applied = true;
                    break;
                }
            }

            if (status === this.AvailableKeyword && !applied) filteredClub.push(club);
            if (status === this.AppliedKeyword && applied) filteredClub.push(club);
        }

        return filteredClub;
    }
}

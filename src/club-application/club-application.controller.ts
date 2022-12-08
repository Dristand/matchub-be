import {Controller, Request, Param, Post, UseGuards} from '@nestjs/common';
import {ClubApplication} from "./club-application.entity";
import {ClubApplicationService} from "./club-application.service";
import {JwtAuthGuard} from "../auth/guard/jwt-auth.guard";

@Controller('club-application')
export class ClubApplicationController{
    constructor(public service: ClubApplicationService) {

    }

    /**
     * Controller for createClubApplication given request body containing clubId, studentId
     *
     * @param req request needed to extract jwt
     * @param clubId
     */
    @UseGuards(JwtAuthGuard)
    @Post('/apply/:clubId')
    async createClubApplication(@Request() req,
                                @Param('clubId') clubId: number): Promise<ClubApplication> {
        const userFromJWT = req.user;

        return await this.service.createApplication(clubId, userFromJWT);
    }
}

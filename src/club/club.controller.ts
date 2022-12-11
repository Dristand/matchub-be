import {Controller, Get, Param, Request, UseGuards} from '@nestjs/common';
import {Club} from "./club.entity";
import {ClubService} from "./club.service";
import {JwtAuthGuard} from "../auth/guard/jwt-auth.guard";

@Controller('club')
export class ClubController{
    constructor(public service: ClubService) {

    }

    /**
     * Controller for getClubListForStudent
     *
     * @param req request needed to extract user from jwt
     * @param status: string
     */
    @UseGuards(JwtAuthGuard)
    @Get('/:status')
    async getClubListForStudent(@Request() req,
                                @Param('status') status: string): Promise<Club[]> {
        const userFromJWT = req.user;

        return await this.service.getClubListForStudent(userFromJWT, status);
    }

    /**
     * Controller for getClubById
     *
     * @param clubId
     */
    @UseGuards(JwtAuthGuard)
    @Get('/detail/:clubId')
    async getClubById(@Param('clubId') clubId: number): Promise<Club> {
        return await this.service.getClubById(clubId);
    }
}

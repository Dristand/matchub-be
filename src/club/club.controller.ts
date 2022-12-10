import {Controller, Get, Param, UseGuards} from '@nestjs/common';
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
     * @param status: string
     * @param studentId: number
     */
    @UseGuards(JwtAuthGuard)
    @Get('/:status/:studentId')
    async getClubListForStudent(@Param('status') status: string,
                                @Param('studentId') studentId: number): Promise<Club[]> {
        return await this.service.getClubListForStudent(studentId, status);
    }

    /**
     * Controller for getClubById
     *
     * @param clubId
     */
    @UseGuards(JwtAuthGuard)
    @Get('/:clubId')
    async getClubById(@Param('clubId') clubId: number): Promise<Club> {
        return await this.service.getClubById(clubId);
    }
}

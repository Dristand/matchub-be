import {Controller, Get, Param} from '@nestjs/common';
import {Club} from "./club.entity";
import {ClubService} from "./club.service";

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
    @Get('/:status/:studentId')
    async getClubListForStudent(@Param('status') status: string,
                                @Param('studentId') studentId: number): Promise<Club[]> {
        return await this.service.getClubListForStudent(studentId, status);
    }
}

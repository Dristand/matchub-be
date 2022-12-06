import {Controller, Get, Param} from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {Club} from "./club.entity";
import {ClubService} from "./club.service";

@Crud({
    model: {
        type: Club
    }
})
@Controller('club')
export class ClubController implements  CrudController<Club> {
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
        const result = await this.service.getClubListForStudent(studentId, status);

        return result;
    }
}

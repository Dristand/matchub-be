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

    @Get('/available/:id')
    async availableClubList(@Param('id') userId: number): Promise<Club[]> {
        const result = await this.service.AvailableClubList(userId);
        console.log(result)

        return result;
    }
}

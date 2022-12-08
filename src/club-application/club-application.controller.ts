import {Body, Controller, Post} from '@nestjs/common';
import {ClubApplication} from "./club-application.entity";
import {ClubApplicationService} from "./club-application.service";
import {ClubApplicationCreateDto} from "./dto/club-application.create.dto";

@Controller('club-application')
export class ClubApplicationController{
    constructor(public service: ClubApplicationService) {

    }

    /**
     * Controller for createClubApplication given request body containing clubId, studentId
     *
     * @param clubApplicationCreateDto contains clubId and studentId as Dto
     */
    @Post('/apply')
    async createClubApplication(@Body() clubApplicationCreateDto: ClubApplicationCreateDto): Promise<ClubApplication> {
        return await this.service.createApplication(clubApplicationCreateDto);
    }
}

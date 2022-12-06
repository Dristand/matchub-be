import {Controller, Post, Req} from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {ClubApplication} from "./club-application.entity";
import {ClubApplicationService} from "./club-application.service";
import {Request} from "express";

@Crud({
    model: {
        type: ClubApplication
    }
})
@Controller('club-application')
export class ClubApplicationController implements CrudController<ClubApplication> {
    constructor(public service: ClubApplicationService) {

    }

    /**
     * Controller for createClubApplication given request body containing clubId, studentId
     *
     * @param request contains clubId and studentId in request body
     */
    @Post('/apply')
    async createClubApplication(@Req() request: Request): Promise<number> {

        const clubId = request.body['clubId'];
        const studentId = request.body['studentId'];
        console.log(clubId, studentId)

        return await this.service.createApplication(clubId, studentId);
    }
}

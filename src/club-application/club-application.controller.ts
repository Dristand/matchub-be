import { Controller } from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {ClubApplication} from "./club-application.entity";
import {ClubApplicationService} from "./club-application.service";

@Crud({
    model: {
        type: ClubApplication
    }
})
@Controller('club-application')
export class ClubApplicationController implements CrudController<ClubApplication> {
    constructor(public service: ClubApplicationService) {

    }
}

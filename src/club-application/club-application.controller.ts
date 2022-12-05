import { Controller } from '@nestjs/common';
import {CrudController} from "@nestjsx/crud";
import {ClubApplication} from "./club-application.entity";
import {ClubApplicationService} from "./club-application.service";

@Controller('club-application')
export class ClubApplicationController implements CrudController<ClubApplication> {
    constructor(public service: ClubApplicationService) {

    }
}

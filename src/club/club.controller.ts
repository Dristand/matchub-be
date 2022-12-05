import { Controller } from '@nestjs/common';
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
}

import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {ClubApplication} from "./club-application.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ClubApplicationService extends TypeOrmCrudService<ClubApplication> {
    constructor(@InjectRepository(ClubApplication) repo) {
        super(repo);
    }
}

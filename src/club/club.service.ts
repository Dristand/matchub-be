import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {Club} from "./club.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ClubService extends TypeOrmCrudService<Club> {
    constructor(@InjectRepository(Club) repo) {
        super(repo);
    }
}

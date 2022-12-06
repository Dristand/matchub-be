import { Module } from '@nestjs/common';
import { ClubApplicationController } from './club-application.controller';
import { ClubApplicationService } from './club-application.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ClubApplication} from "./club-application.entity";
import {User} from "../users/user.entity";
import {Club} from "../club/club.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ClubApplication, Club, User])],
  controllers: [ClubApplicationController],
  providers: [ClubApplicationService]
})
export class ClubApplicationModule {}

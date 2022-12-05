import { Module } from '@nestjs/common';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Club} from "./club.entity";
import {ClubApplication} from "../club-application/club-application.entity";
import {User} from "../users/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Club, ClubApplication, User])],
  controllers: [ClubController],
  providers: [ClubService]
})
export class ClubModule {}

import { Module } from '@nestjs/common';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Club} from "./club.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Club])],
  controllers: [ClubController],
  providers: [ClubService]
})
export class ClubModule {}

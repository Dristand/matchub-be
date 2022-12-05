import { Module } from '@nestjs/common';
import { ClubApplicationController } from './club-application.controller';
import { ClubApplicationService } from './club-application.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ClubApplication} from "./club-application.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ClubApplication])],
  controllers: [ClubApplicationController],
  providers: [ClubApplicationService]
})
export class ClubApplicationModule {}

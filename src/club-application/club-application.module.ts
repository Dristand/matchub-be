import { Module } from '@nestjs/common';
import { ClubApplicationController } from './club-application.controller';
import { ClubApplicationService } from './club-application.service';

@Module({
  controllers: [ClubApplicationController],
  providers: [ClubApplicationService]
})
export class ClubApplicationModule {}

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ClubModule } from './club/club.module';
import { ClubApplicationModule } from './club-application/club-application.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'changemeplease',
    database: 'postgres',
    synchronize: true,

    entities: ['dist/**/*.entity{.ts,.js}'],
  }),
    UsersModule,
    ClubModule,
    ClubApplicationModule],
})
export class AppModule {}

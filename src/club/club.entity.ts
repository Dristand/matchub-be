import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {ClubApplication} from "../club-application/club-application.entity";

@Entity()
export class Club {

    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    about: string;

    @ApiProperty()
    @Column()
    lastYearActiveMember: number;

    @ApiProperty()
    @Column({default: 0})
    registrationFee: number;

    @ApiProperty()
    @Column()
    contactPersonName: string;

    @ApiProperty()
    @Column()
    contactPersonNumber: string;

    @ApiProperty()
    @OneToMany("ClubApplication",
        (clubApplication: ClubApplication) => clubApplication.club,
        {eager: true}
        )
    applicantList: ClubApplication[];

}
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

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
}
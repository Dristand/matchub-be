import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {ClubApplication} from "../club-application/club-application.entity";

// Note :
// Future Development, make a subclass for Student and ClubOwner (move studentId to Student)
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({unique: true})
    studentId: number;

    @ApiProperty()
    @Column()
    fullName: string;

    @ApiProperty()
    @Column({unique: true})
    email: string;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty()
    @OneToMany("ClubApplication",
        (clubApplication: ClubApplication) => clubApplication.user,
        {eager: true}
    )
    applicationList: ClubApplication[];

    @ApiProperty()
    @Column({default: "$2b$10$hYYjHEeD.Ln6MYk8/lIP4u"}) //TODO: remove default
    passwordSalt: string;
}
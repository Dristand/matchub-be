import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

// Note :
// Future Development, make a subclass for Student and Club (move studentId to Student)
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
    @PrimaryColumn()
    email: string;

}
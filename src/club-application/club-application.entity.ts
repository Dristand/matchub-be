import {CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.entity";
import {Club} from "../club/club.entity";

@Entity()
export class ClubApplication {

    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @ManyToOne(type => User)
    @JoinColumn()
    user: User;

    @ApiProperty()
    @ManyToOne(type => Club)
    @JoinColumn()
    club: Club;

    @ApiProperty()
    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt: Date;
}
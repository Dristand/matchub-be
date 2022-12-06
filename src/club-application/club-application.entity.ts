import {CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.entity";
import {Club} from "../club/club.entity";

@Entity()
export class ClubApplication {

    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @ManyToOne("User",
        (user: User) => user.applicationList,
        {cascade: true, onDelete: "CASCADE"}
    )
    @JoinColumn({name: 'user_id'})
    user: User;

    @ApiProperty()
    @ManyToOne("Club",
        (club: Club) => club.applicantList,
        {cascade: true, onDelete: "CASCADE"}
        )
    @JoinColumn({name: 'club_id'})
    club: Club;

    @ApiProperty()
    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt: Date;
}
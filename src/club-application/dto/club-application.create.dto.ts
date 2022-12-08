import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ClubApplicationCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    clubId: number;

    @ApiProperty()
    @IsNotEmpty()
    studentId: number;
}
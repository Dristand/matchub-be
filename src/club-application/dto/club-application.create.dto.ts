import {IsNotEmpty} from "class-validator";

export class ClubApplicationCreateDto {
    @IsNotEmpty()
    clubId: number;

    @IsNotEmpty()
    studentId: number;
}
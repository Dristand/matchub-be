import {IsEmail, IsNotEmpty} from "class-validator";

export class UserCreateDto {
    @IsNotEmpty()
    studentId: number;

    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
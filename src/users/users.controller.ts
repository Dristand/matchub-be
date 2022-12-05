import {Controller, Get, Param} from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {User} from "./user.entity";
import {UsersService} from "./users.service";
import {ClubApplication} from "../club-application/club-application.entity";

@Crud({
    model: {
        type: User
    }
})
@Controller('users')
export class UsersController implements CrudController<User> {
    constructor(public service: UsersService) {

    }

    @Get('/applied/:id')
    async availableClubList(@Param('id') userId: number): Promise<ClubApplication[]> {
        const result = await this.service.ClubApplicationList(userId);
        console.log(result)

        return result;
    }
}

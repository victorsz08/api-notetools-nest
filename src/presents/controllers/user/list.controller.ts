import { Controller, Get, Query } from "@nestjs/common";
import { ListUserDto } from "src/presents/dtos/user/list.dto";
import { ListUserUsecase } from "src/usecases/user/list.usecase";




@Controller("users")
export class ListUserController {

    constructor(private readonly listUserUsecase: ListUserUsecase) {};

    @Get()
    async list(@Query() input: ListUserDto) {
        const response = await this.listUserUsecase.execute(input);
        return response;
    };
};
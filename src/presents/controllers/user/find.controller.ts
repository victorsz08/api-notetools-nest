import { Controller, Get, Param } from "@nestjs/common";
import { FindUserDto } from "src/presents/dtos/user/find.dto";
import { FindUserUsecase } from "src/usecases/user/find.usecase";





@Controller("users")
export class FindUserController {

    constructor(private readonly findUserUsecase: FindUserUsecase) {};

    @Get(":id")
    async find(@Param() input: FindUserDto) {
        const response = await this.findUserUsecase.execute(input);
        return response;
    };
};
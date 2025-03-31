import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CreateUserDto } from "src/presents/dtos/user/create.dto";
import { CreateUserUsecase } from "src/usecases/user/create.usecase";




@Controller("users")
export class CreateUserController {
    constructor(private readonly createUserusecase: CreateUserUsecase) {};

    @Post()
    @HttpCode(201)
    async create(@Body() input: CreateUserDto) {
        await this.createUserusecase.execute(input);
        return;
    };
};
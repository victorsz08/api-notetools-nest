import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { CreateUserDto } from "src/presents/dtos/user/create.dto";
import { CreateUserUsecase } from "src/usecases/user/create.usecase";




@Controller("users")
export class CreateUserController {
    constructor(private readonly createUserusecase: CreateUserUsecase) {};

    @Post()
    @Roles(Role.ADMIN)
    @HttpCode(201)
    async create(@Body() input: CreateUserDto) {
        await this.createUserusecase.execute(input);
        return;
    };
};
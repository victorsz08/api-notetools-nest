import { Body, Controller, Param, Put } from "@nestjs/common";
import { FindUserDto } from "src/presents/dtos/user/find.dto";
import { UpdateUserDto } from "src/presents/dtos/user/update.dto";
import { UpdateUserInputDto, UpdateUserUsecase } from "src/usecases/user/update.usecase";





@Controller("users")
export class UpdateUserController {

    constructor(private readonly updateUserUsecase: UpdateUserUsecase) {};

    @Put(":id")
    async update(@Param() params: FindUserDto, @Body() body: UpdateUserDto) {
        const input: UpdateUserInputDto = { 
            id: params.id,
            username: body.username,
            firstName: body.firstName,
            lastName: body.lastName,
        };

        await this.updateUserUsecase.execute(input);
        return;
    } ;
};
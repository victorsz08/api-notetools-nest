import { Body, Controller, Param, Put } from "@nestjs/common";
import { FindUserDto } from "src/presents/dtos/user/find.dto";
import { UpdatePasswordDto } from "src/presents/dtos/user/update-password.dto";
import { UpdatePasswordInputDto, UpdatePasswordUsecase } from "src/usecases/user/update-password-usecase";



@Controller("users/password")
export class UpdatePasswordController {

    constructor(private readonly updatePasswordUsecase: UpdatePasswordUsecase) {};

    @Put(":id")
    async updatePassword(@Param() params: FindUserDto, @Body() body: UpdatePasswordDto) {
        const input: UpdatePasswordInputDto = {
            id: params.id,
            currentPassword: body.currentPassword,
            newPassword: body.newPassword,
        };
        
        await this.updatePasswordUsecase.execute(input);
        return;
    };
};
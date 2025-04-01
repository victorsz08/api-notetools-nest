import { Body, Controller, HttpCode, Param, Post } from "@nestjs/common";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { GrantedUserDto } from "src/presents/dtos/security/granted-user.dto";
import { ResetAccessDto } from "src/presents/dtos/security/reset-access.dto";
import { GrantedUserInputDto, GrantedUserUsecase } from "src/usecases/security/granted-user.usecase";



@Controller("securities/granted")
export class GrantedUserController {
    constructor(private readonly grantedUserUsecase: GrantedUserUsecase) {};

    @Post(":userId")
    @Roles(Role.ADMIN)
    @HttpCode(204)
    async grantedUser(@Param() params: ResetAccessDto, @Body() body: GrantedUserDto) {
        const { userId } = params;
        const { role } = body;
        const input: GrantedUserInputDto = { userId, role };
        
        await this.grantedUserUsecase.execute(input);
        return;
    };
};
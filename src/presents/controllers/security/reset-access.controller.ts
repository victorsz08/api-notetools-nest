import { Controller, HttpCode, Param, Post } from "@nestjs/common";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { ResetAccessDto } from "src/presents/dtos/security/reset-access.dto";
import { ResetAccessUsecase } from "src/usecases/security/reset-access.usecase";


@Controller("securities/reset")
export class ResetAccessController {
    constructor(private readonly resetAccessUsecase: ResetAccessUsecase) {};


    @Post(":userId")
    @Roles(Role.ADMIN)
    @HttpCode(200)
    async resetAccess(@Param() input: ResetAccessDto) {
        const access = await this.resetAccessUsecase.execute(input);
        return access;
    };
};
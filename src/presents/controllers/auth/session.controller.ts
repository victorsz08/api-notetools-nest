import { Controller, Get, Req } from "@nestjs/common";
import { FindUserUsecase } from "src/usecases/user/find.usecase";
import { Request } from "express";
import { UserEntity } from "src/domain/entities/user.entity";


@Controller("auth/session")
export class AuthSessionController {

    constructor(private readonly findUserUsecase: FindUserUsecase) {};

    @Get()
    async session(@Req() req: Request & { user: UserEntity }) {
        const { id } = req.user;
        const user = await this.findUserUsecase.execute({ id });

        return user;
    };
};
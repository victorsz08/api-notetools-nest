import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { AuthLoginDto } from "src/presents/dtos/auth/login.dto";
import { AuthLoginUsecase } from "src/usecases/auth/login.usecase";
import { Response } from "express";


@Controller("auth/login")
export class AuthLoginController {
    constructor(private readonly authLoginUsecase: AuthLoginUsecase) {};

    @Post()
    @HttpCode(200)
    async login(@Body() input: AuthLoginDto, @Res({ passthrough: true }) response: Response) {
        const payload = await this.authLoginUsecase.execute(input);

        response.cookie("nt.token", payload.token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 60 * 24,
            expires: payload.expiresIn
        });

        return;
    }
};
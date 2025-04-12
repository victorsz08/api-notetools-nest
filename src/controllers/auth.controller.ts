import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { addDays } from "date-fns";
import { Response } from "express";
import { AuthService } from "src/services/auth.service";
import { AuthLoginDto } from "src/validators/auth/login";



@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {};

    @Post("login")
    @HttpCode(204)
    async login(@Body() body: AuthLoginDto, @Res() response: Response) {
        const { username, password } = body;
        const payload = await this.authService.login(username, password);

        return response.cookie("nt.token", payload, {
            maxAge: 60 * 60 * 60 * 24, // 1 dia
            httpOnly: true,
            expires: addDays(new Date(), 1)
        });
    };
};
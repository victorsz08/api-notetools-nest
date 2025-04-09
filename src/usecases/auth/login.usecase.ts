import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { AuthInterface, AuthTokenDto } from "src/domain/interfaces/auth.interface";



export type AuthLoginInputDto = {
    username: string;
    password: string;
};

export type AuthLoginOutputDto = {
    token: string;
    expiresIn: Date;
};

@Injectable()
export class AuthLoginUsecase implements Usecase<AuthLoginInputDto, AuthLoginOutputDto> {
    constructor(private readonly authInterface: AuthInterface) {};
    
    async execute(input: AuthLoginInputDto): Promise<AuthLoginOutputDto> {
        const  { username, password } = input;
        const payload = await this.authInterface.login(username, password);

        const output = this.present(payload);
        return output;
    };

    private present(payload: AuthTokenDto): AuthLoginOutputDto {
        return {
            token: payload.token,
            expiresIn: payload.expiresIn
        };
    };
};
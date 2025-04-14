import { IsNotEmpty } from "class-validator";


export class AuthLoginDto {
    @IsNotEmpty({ message: "username ou senha incorretos" })
    username: string;

    @IsNotEmpty({ message: "username ou senha incorretos" })
    password: string;
}
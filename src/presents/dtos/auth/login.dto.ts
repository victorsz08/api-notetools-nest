import { IsNotEmpty } from "class-validator";



export class AuthLoginDto {
    @IsNotEmpty({ message: "campo username é obrigatório" })
    readonly username: string;

    @IsNotEmpty({ message: "campo senha é obrigatório" })
    readonly password: string;
};
import { IsNotEmpty, Length } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty({ message: "campo username é obrigatório"})
    @Length(4, 24, { message: "campo username deve conter entre 4 e 24 caracteres" })
    username: string;

    @IsNotEmpty({ message: "campo nome é obrigatório"})
    @Length(4, 24, { message: "campo nome deve conter entre 4 e 24 caracteres" })
    firstName: string;

    @IsNotEmpty({ message: "campo sobrenome é obrigatório"})
    @Length(4, 24, { message: "campo sobrenome deve conter entre 4 e 24 caracteres" })
    lastName: string;

    @IsNotEmpty({ message: "campo senha é obrigatório"})
    @Length(4, 24, { message: "campo senha deve conter entre 4 e 24 caracteres" })
    password: string;
};
import { IsNotEmpty, Length } from "class-validator";



export class UpdateUserDto {
    @IsNotEmpty({ message: "campo username é obrigatório"})
    @Length(4, 14, { message: "username deve conter entre 4 e 14 caracteres"})
    readonly username: string;
    
    @IsNotEmpty({ message: "campo nome é obrigatório"})
    @Length(4, 24, { message: "nome deve conter entre 4 e 24 caracteres" })
    readonly firstName: string;

    @IsNotEmpty({ message: "campo sobrenome é obrigatório"})
    @Length(4, 24, { message: "sobrenome deve conter entre 4 e 24 caracteres" })
    readonly lastName: string;
};
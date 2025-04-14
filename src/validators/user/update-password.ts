import { IsNotEmpty, Length } from "class-validator";



export class UpdatePasswordDto {
    @IsNotEmpty({ message: "campo senha atual é obrigatório" })
    currentPassword: string;

    @IsNotEmpty({ message: "campo senha atual é obrigatório" })
    @Length(8, 24, { message: "o campo nova senha deve conter entre 6 e 24 caracteres" })
    newPassword: string;
};
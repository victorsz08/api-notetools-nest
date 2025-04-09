import { IsNotEmpty, Length } from "class-validator";




export class UpdatePasswordDto {
    @IsNotEmpty({ message: "campo senha atual é obrigatório"})
    readonly currentPassword: string;

    @IsNotEmpty({ message: "campo nova senha é obrigatório"})
    @Length(4, 32, { message: "nova senha deve conter entre 4 e 32 caracteres" })
    readonly newPassword: string;
};
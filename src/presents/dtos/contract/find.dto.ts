import { IsNotEmpty, MaxLength } from "class-validator";



export class FindContractDto {
    @IsNotEmpty({ message: "parametro id é obrigatório" })
    @MaxLength(255, { message: "parametro id deve ter no máximo 255 caracteres" })
    readonly id: string;
};
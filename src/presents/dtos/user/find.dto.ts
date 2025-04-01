import { IsNotEmpty } from "class-validator";


export class FindUserDto {
    @IsNotEmpty({ message: "parametro id é obrigatório" })
    readonly id: string;
};
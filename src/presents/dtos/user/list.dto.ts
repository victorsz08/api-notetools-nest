import { IsNotEmpty } from "class-validator";



export class ListUserDto {
    @IsNotEmpty({ message: "parametro page é obrigatório" })
    readonly page: number;

    readonly search?: string;
};
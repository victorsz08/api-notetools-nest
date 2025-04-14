import { IsNotEmpty } from "class-validator";




export class FindOrderDto {
    @IsNotEmpty({ message: "parametro id é obrigatório" })
    id: string;
};
import { IsNotEmpty, Length } from "class-validator";

export class UpdateOrderDto {
    @IsNotEmpty({ message: "campo numero é obrigatório" })
    @Length(4, 24, { message: "campo numero deve ter entre 4 e 24 caracteres" })
    number: number;

    @IsNotEmpty({ message: "campo local é obrigatório" })
    local: string;

    observation: string;

    @IsNotEmpty({ message: "campo preço é obrigatório" })
    price: number;

    @IsNotEmpty({ message: "campo contato é obrigatório" })
    @Length(8, 24, { message: "campo contato deve ter entre 8 e 24 caracteres" })
    contact: string;
}
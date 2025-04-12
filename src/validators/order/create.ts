import { IsNotEmpty, Length, MinDate } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty({ message: "campo numero é obrigatório" })
    @Length(4, 24, { message: "campo numero deve ter entre 4 e 24 caracteres" })
    number: number;

    @IsNotEmpty({ message: "campo local é obrigatório" })
    local: string;

    observation: string;
    
    @IsNotEmpty({ message: "campo data de agendamento é obrigatório" })
    @MinDate(new Date(), { message: "campo data de agendamento deve ser uma data futura" })
    schedulingDate: Date;

    @IsNotEmpty({ message: "campo hora de agendamento é obrigatório" })
    schedulingTime: string;

    @IsNotEmpty({ message: "campo preço é obrigatório" })
    price: number;

    @IsNotEmpty({ message: "campo contato é obrigatório" })
    @Length(8, 24, { message: "campo contato deve ter entre 8 e 24 caracteres" })
    contact: string;
};
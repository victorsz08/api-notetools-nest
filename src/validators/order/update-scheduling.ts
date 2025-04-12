import { IsNotEmpty, MinDate } from "class-validator";

export class UpdateSchedulingDto {
    @IsNotEmpty({ message: "campo data de agendamento é obrigatório" })
    @MinDate(new Date(), { message: "campo data de agendamento deve ser uma data futura" })
    schedulingDate: Date;

    @IsNotEmpty({ message: "campo hora de agendamento é obrigatório" })
    schedulingTime: string;
}
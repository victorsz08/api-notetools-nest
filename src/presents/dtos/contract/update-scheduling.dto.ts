import { IsNotEmpty, MaxLength } from "class-validator";


export class UpdateSchedulingDto {
    @IsNotEmpty({ message: "campo data de agendamento é obrigatório" })
    @MaxLength(24, { message: "campo data de agendamento deve ter no máximo 24 caracteres" })
    readonly schedulingDate: Date;

    @IsNotEmpty({ message: "campo horário de agendamento é obrigatório" })
    @MaxLength(24, { message: "campo horário de agendamento deve ter no máximo 24 caracteres" })
    readonly schedulingTime: string;
};
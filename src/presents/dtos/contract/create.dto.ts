import { IsNotEmpty, Length, MaxLength } from "class-validator";



export class CreateContractDto {
    @IsNotEmpty({ message: "campo número do contrato é obrigatório" })
    @Length(4, 24, { message: "campo número do contrato deve ter entre 4 e 24 caracteres" })
    readonly number: number;

    @IsNotEmpty({ message: "campo local é obrigatório" })
    @MaxLength(48, { message: "campo local deve ter no máximo 48 caracteres" })
    readonly local: string;

    @MaxLength(255, { message: "campo observação deve ter no máximo 255 caracteres" })
    readonly observation: string;

    @IsNotEmpty({ message: "campo data de agendamento é obrigatório" })
    @MaxLength(24, { message: "campo data de agendamento deve ter no máximo 24 caracteres" })
    readonly schedulingDate: Date;

    @IsNotEmpty({ message: "campo horário de agendamento é obrigatório" })
    @MaxLength(24, { message: "campo horário de agendamento deve ter no máximo 24 caracteres" })
    readonly schedulingTime: string;

    @IsNotEmpty({ message: "campo valor é obrigatório" })
    @MaxLength(24, { message: "campo valor deve ter no máximo 24 caracteres" })
    readonly price: number;

    @IsNotEmpty({ message: "campo contato é obrigatório" })
    @MaxLength(24, { message: "campo contato deve ter no máximo 24 caracteres" })
    readonly contact: string;
};
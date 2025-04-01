import { IsNotEmpty, MaxLength } from "class-validator";



export class UpdateContractDto {
    @IsNotEmpty({ message: "campo número do contrato é obrigatório" })
    @MaxLength(32, { message: "campo número do contrato deve ter no máximo 32 caracteres" })
    readonly number: number;

    @IsNotEmpty({ message: "campo local é obrigatório" })
    @MaxLength(48, { message: "campo local deve ter no máximo 48 caracteres" })
    readonly local: string;
    
    readonly observation: string;
    
    @IsNotEmpty({ message: "campo valor é obrigatório" })
    @MaxLength(24, { message: "campo valor deve ter no máximo 24 caracteres" })
    readonly price: number;

    @IsNotEmpty({ message: "campo contato é obrigatório" })
    @MaxLength(24, { message: "campo contato deve ter no máximo 24 caracteres" })
    readonly contact: string;
}
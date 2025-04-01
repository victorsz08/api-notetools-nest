import { IsNotEmpty, MaxLength } from "class-validator";
import { StatusType } from "src/domain/entities/contract.entity";


export class ListContractDto {
    @IsNotEmpty({ message: "parametro userId é obrigatório" })
    @MaxLength(255, { message: "parametro userId deve ter no máximo 255 caracteres" })
    readonly userId: string;

    @IsNotEmpty({ message: "parametro page é obrigatório" })
    @MaxLength(3, { message: "parametro page deve ter no máximo 3 caracteres" })
    readonly page: number;

    
    readonly createdAtDateIn?: Date;
    readonly createdAtDateOut?: Date;
    readonly schedulingDateIn?: Date;
    readonly schedulingDateOut?: Date;
    readonly status?: StatusType;
    readonly orderBy?: "asc" | "desc";
};
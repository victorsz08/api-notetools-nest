import { IsNotEmpty, MaxLength } from "class-validator";
import { StatusType } from "src/domain/entities/contract.entity";



export class UpdateStatusDto {
    @IsNotEmpty({ message: "campo status é obrigatório" })
    @MaxLength(24, { message: "campo status deve ter no máximo 24 caracteres" })
    readonly status: StatusType;
};
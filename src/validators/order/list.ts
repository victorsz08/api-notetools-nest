import { IsNotEmpty } from "class-validator";
import { StatusType } from "src/enums/status.enum";

export class ListOrderDto {
    @IsNotEmpty({ message: "id do usuário é obrigatório" })
    userId: string;
    
    page?: number;
    perPage?: number;
    local?: string;
    schedulingDateIn?: Date;
    schedulingDateOut?: Date;
    createDateIn?: Date;
    createDateOut?: Date;
    status?: StatusType; 
}
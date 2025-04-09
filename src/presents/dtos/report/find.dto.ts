import { IsNotEmpty } from "class-validator";



export class FindReportDto {
    @IsNotEmpty({ message: "Parametro userId é obrigatório" })
    readonly userId: string;

    @IsNotEmpty({ message: "Parametro data inicial é obrigatório" })
    readonly startDate: string;

    @IsNotEmpty({ message: "Parametro data final é obrigatório" })
    readonly endDate: string;   
};
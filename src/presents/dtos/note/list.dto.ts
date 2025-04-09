import { IsNotEmpty, MaxLength } from "class-validator";


export class ListNoteDto {
    @IsNotEmpty({ message: "parametro userId é obrigatório" })
    readonly userId: string;

    @IsNotEmpty({ message: "parametro page é obrigatório" })
    @MaxLength(3, { message: "parametro page deve ter no máximo 3 caracteres" })
    readonly page: number;

    readonly startDate?: Date;
    readonly endDate?: Date;
};
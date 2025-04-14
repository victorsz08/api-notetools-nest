import { IsNotEmpty } from "class-validator";

export class ListNoteDto {
    @IsNotEmpty({ message: "id do usuário é obrigatório"})
    userId: string;

    page?: number;
    perPage?: number;
    startDate?: Date;
    endDate?: Date;
}
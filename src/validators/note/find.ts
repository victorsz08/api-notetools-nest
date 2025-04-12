import { IsNotEmpty } from "class-validator";

export class FindNoteDto {
    @IsNotEmpty({ message: "ID da nota não pode ser vazio" })
    id: string;
};
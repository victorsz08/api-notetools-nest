import { IsNotEmpty } from "class-validator";

export class UpdateNoteDto {
    title: string;

    @IsNotEmpty({ message: "conteudo da nota não pode ser vazio" })
    content: string;
}
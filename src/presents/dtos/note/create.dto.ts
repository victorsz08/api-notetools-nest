import { IsNotEmpty } from "class-validator";

export class CreateNoteDto {
    @IsNotEmpty({ message: "Campo conteúdo é obrigatório" })
    readonly content: string;
};
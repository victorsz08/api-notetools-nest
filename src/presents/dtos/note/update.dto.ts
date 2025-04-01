import { IsNotEmpty } from "class-validator";


export class UpdateNoteDto {
    @IsNotEmpty({ message: "campo conteudo é obrigatório" })
    readonly content: string;
};
import { IsNotEmpty } from "class-validator";


export class CreateNoteDto {
  title: string;

  @IsNotEmpty({ message: "conteudo da nota não pode ser vazio" })
  content: string;
};
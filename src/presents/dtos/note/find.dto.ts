import { IsNotEmpty } from "class-validator";


export class FindNoteDto {
    @IsNotEmpty({ message: "parametro id é obrigatório" })
    readonly id: string;
};
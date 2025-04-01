import { IsNotEmpty } from "class-validator";


export class ResetAccessDto {
    @IsNotEmpty({ message: "parametro userId é obrigatório"})
    readonly userId: string;
};
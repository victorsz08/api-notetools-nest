import { IsNotEmpty } from "class-validator";

export class UpdateStatusDto {
    @IsNotEmpty({ message: "campo status é obrigatório" })
    status: string;
};
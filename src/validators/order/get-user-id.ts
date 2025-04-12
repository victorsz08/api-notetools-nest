import { IsNotEmpty } from "class-validator";

export class GetUserIdDto {
    @IsNotEmpty({ message: "id do o usuario é obrigatório" })
    userId: string;
};
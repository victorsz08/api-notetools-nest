import { IsNotEmpty } from "class-validator";


export class GrantedUserDto {
    @IsNotEmpty({ message: "campo cargo é obrigatório"})
    readonly role: string;
};
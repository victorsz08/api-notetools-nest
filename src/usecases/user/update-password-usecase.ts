import { UserInterface } from "src/domain/interfaces/user.interface";
import { Usecase } from "../usecase";
import { Injectable } from "@nestjs/common";


export type UpdatePasswordInputDto = {
    id: string;
    currentPassword: string;
    newPassword: string;
};

@Injectable()
export class UpdatePasswordUsecase implements Usecase<UpdatePasswordInputDto, void> {
    
    constructor(private readonly userInterface: UserInterface) {};
    
    async execute(input: UpdatePasswordInputDto): Promise<void> {
        const { id, currentPassword, newPassword } = input;

        await this.userInterface.updatePassword(id, currentPassword, newPassword);
        return;
    };
};
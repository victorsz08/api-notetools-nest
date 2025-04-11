import { UserInterface } from "src/domain/interfaces/user.interface";
import { Usecase } from "../usecase";
import { Injectable } from "@nestjs/common";

export type UpdatePasswordInputDto = {
    id: string;
    currentPassword: string;
    newPassword: string;
};

export type UpdatePasswordOutputDto = void;

@Injectable()
export class UpdatePasswordUsecase implements Usecase<UpdatePasswordInputDto, UpdatePasswordOutputDto> {
    constructor(private readonly userInterface: UserInterface) {};
    
    async execute(data: UpdatePasswordInputDto): Promise<void> {
        const { id, currentPassword, newPassword } = data;
        await this.userInterface.updatePassword(id, currentPassword, newPassword);

        return;
    };
};
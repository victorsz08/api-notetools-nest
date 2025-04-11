import { UserInterface } from "src/domain/interfaces/user.interface";
import { Usecase } from "../usecase";
import { Injectable } from "@nestjs/common";


export type UpdateUserInputDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
};

export type UpdateUserOutputDto = void;

@Injectable()
export class UpdateUserUsecase implements Usecase<UpdateUserInputDto, UpdateUserOutputDto> {
    constructor(private readonly userInterface: UserInterface) {};
    
    async execute(data: UpdateUserInputDto): Promise<void> {
        const { id, username, firstName, lastName } = data;

        await this.userInterface.update(id, username, firstName, lastName);
        return;
    };
};
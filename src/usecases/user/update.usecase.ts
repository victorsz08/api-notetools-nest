import { UserInterface } from "src/domain/interfaces/user.interface";
import { Usecase } from "../usecase";
import { Injectable } from "@nestjs/common";


export type UpdateUserInputDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
};

@Injectable()
export class UpdateUserUsecase implements Usecase<UpdateUserInputDto, void> {
    
    constructor(private readonly userInterafce: UserInterface) {}
    
    async execute(input: UpdateUserInputDto): Promise<void> {
        const { id, username, firstName, lastName } = input;

        await this.userInterafce.update(id, username, firstName, lastName);
        return;
    };
};
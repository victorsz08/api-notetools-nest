import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { UserInterface } from "src/domain/interfaces/user.interface";
import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";

export type CreateUserInputDto = {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
};

@Injectable()
export class CreateUserUsecase implements Usecase<CreateUserInputDto, void> {
    
    constructor(private readonly userInterface: UserInterface) {};
    
    async execute(input: CreateUserInputDto): Promise<void> {
        const { username, firstName, lastName, password }  = input;
        const passwordHashed = await hash(password, 10);

        const user = {
            id: uuid(),
            username,
            firstName,
            lastName,
            password: passwordHashed,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await this.userInterface.create(user);
        return;
    };
};
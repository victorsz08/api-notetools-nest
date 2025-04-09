import { UserInterface } from "src/domain/interfaces/user.interface";
import { Usecase } from "../usecase";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/domain/entities/user.entity";


export type FindUserInputDto = {
    id: string;
};

export type FindUserOutputDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
};

@Injectable()
export class FindUserUsecase implements Usecase<FindUserInputDto, FindUserOutputDto> {
    
    constructor(private readonly userInterface: UserInterface) {};
    
    async execute(input: FindUserInputDto): Promise<FindUserOutputDto> {
        const { id } = input;
        const user = await this.userInterface.find(id);

        const output = this.present(user);
        return output;
    };

    private present(user: UserEntity): FindUserOutputDto {
        return {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    };
};
import { UserInterface } from "src/domain/interfaces/user.interface";
import { Usecase } from "../usecase";
import { User } from "@prisma/client";
import { UserEntity } from "src/domain/entities/user.entity";
import { Injectable } from "@nestjs/common";


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

    async execute(data: FindUserInputDto): Promise<FindUserOutputDto> {
        const { id } = data;
        const user = await this.userInterface.find(id);

        const output = this.presents(user);
        return output;
    };

    private presents(user: UserEntity): FindUserOutputDto {
        return {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }
};
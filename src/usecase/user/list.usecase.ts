import { ListUserOutput, UserInterface } from "src/domain/interfaces/user.interface";
import { Usecase } from "../usecase";
import { Injectable } from "@nestjs/common";


export type ListUserInputDto = {
    page?: number;
    perPage?: number;
    search?: string;
};

export type ListUserOutputDto = {
    users: {
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    totalItems: number;
    totalPages: number;
};

@Injectable()
export class ListUserUsecase implements Usecase<ListUserInputDto, ListUserOutputDto> {
    constructor(private readonly userInterface: UserInterface) {};

    async execute(data: ListUserInputDto): Promise<ListUserOutputDto> {
        const { page, perPage, search } = data;
        const users = await this.userInterface.list({ page, perPage, search });

        const output = this.presents(users);
        return output;
    };

    private presents(data: ListUserOutput): ListUserOutputDto {
        return {
            users: data.users.map(user => ({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            })),
            totalItems: data.totalItems,
            totalPages: data.totalPages,
        };
    };
};
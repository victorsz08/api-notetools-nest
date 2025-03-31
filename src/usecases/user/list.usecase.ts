import { QueryUserOutput, UserInterface } from "src/domain/interfaces/user.interface";
import { Usecase } from "../usecase";



export type ListUserInputDto = {
    page: number;
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

export class ListUserUsecase implements Usecase<ListUserInputDto, ListUserOutputDto> {
    
    constructor(private readonly userInterface: UserInterface) {};
    
    async execute(input: ListUserInputDto): Promise<ListUserOutputDto> {
        const data = await this.userInterface.list(input);

        const output = this.present(data);
        return output;
    };

    private present(data: QueryUserOutput): ListUserOutputDto {
        return {
            users: data.users.map((user) => {
                return {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            }),
            totalItems: data.totalItems,
            totalPages: data.totalPages
        };
    };
};
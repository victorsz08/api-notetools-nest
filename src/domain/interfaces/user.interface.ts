import { UserEntity } from "../entities/user.entity";

export type ListUserOutput = {
    users: UserEntity[];
    totalItems: number;
    totalPages: number;
};

export type ListUserInput = {
    page?: number;
    perPage?: number;
    search?: string;
};

export abstract class UserInterface {
    abstract save(user: UserEntity): Promise<void>;
    abstract find(id: string): Promise<UserEntity>;
    abstract list(query: ListUserInput): Promise<ListUserOutput>;
    abstract update(id: string, username: string, firstName: string, lastName: string): Promise<void>;
    abstract updatePassword(id: string, currentPassword: string, newPassword: string): Promise<void>;
};
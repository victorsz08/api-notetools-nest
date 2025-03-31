import { UserEntity } from "../entities/user.entity";

export type QueryUserInput = {
    page: number;
    search?: string;
};

export type QueryUserOutput = {
    users: UserEntity[];
    totalItems: number;
    totalPages: number;
}

export abstract class UserInterface {
    abstract create(user: UserEntity): Promise<void>;
    abstract find(id: string): Promise<UserEntity>;
    abstract list(query: QueryUserInput): Promise<QueryUserOutput>;
    abstract update(id: string, username: string, firstName: string, lastName: string): Promise<void>;
    abstract updatePassword(id: string, currentPassword: string, newPassword: string): Promise<void>;
};
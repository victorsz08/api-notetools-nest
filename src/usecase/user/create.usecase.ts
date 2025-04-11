import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";
import { Usecase } from "../usecase";
import { Injectable } from "@nestjs/common";
import { UserInterface } from "src/domain/interfaces/user.interface";
import { UserEntity } from "src/domain/entities/user.entity";
import { Role } from "src/enums/role.enum";


export type CreateUserInputDto = {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
};

export type CreateUserOutputDto = void;

@Injectable()
export class CreateUserUsecase implements Usecase<CreateUserInputDto, CreateUserOutputDto> {
    
    constructor(private readonly userInterface: UserInterface) {};
    
    async execute(data: CreateUserInputDto): Promise<void> {
        const { username, firstName, lastName, password } = data;

        const passwordHashed = await hash(password, 10);

        const user: UserEntity = {
            id: uuid(),
            username,
            firstName,
            lastName,
            role: Role.ADMIN,
            password: passwordHashed,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await this.userInterface.save(user);
        return;
    };
};
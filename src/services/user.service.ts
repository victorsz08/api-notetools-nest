import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { PrismaService } from "src/database/prisma-service";
import { UserEntity } from "src/domain/entities/user.entity";
import { QueryUserInput, QueryUserOutput, UserInterface } from "src/domain/interfaces/user.interface";




@Injectable()
export class UserService implements UserInterface {
    
    constructor(private readonly repository: PrismaService) {};
    
    async create(user: UserEntity): Promise<void> {
        const {
            id,
            username,
            firstName,
            lastName,
            password,
            createdAt,
            updatedAt
        } = user;
        const usernameAlreadyExists = await this.repository.user.findUnique({ 
            where: { username: username }
        });

        if(usernameAlreadyExists) {
            throw new HttpException("username indisponível", HttpStatus.CONFLICT);
        };
        
        const data: Prisma.UserCreateInput = {
            id,
            username,
            name: firstName,
            lastname: lastName,
            password,
            createdAt,
            updatedAt
        }

        await this.repository.user.create({ data });
        return;
    };

    async find(id: string): Promise<UserEntity> {
        const user = await this.repository.user.findUnique({ where: { id }});
        
        if(!user) {
            throw new HttpException("usuário não localizado", HttpStatus.NOT_FOUND);
        };

        const output: UserEntity = {
            id: user.id,
            username: user.username,
            firstName: user.name,
            lastName: user.lastname,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return output;
    };

    async list(query: QueryUserInput): Promise<QueryUserOutput> {
        const { page, search } = query;
        const take = 10;

        const queryUserArgs: Prisma.UserFindManyArgs = {
            where: {},
            take,
            skip: (page -1) * take
        };

        const countUserArgs: Prisma.UserCountArgs = {
            where: {}
        };

        if(search) {
            queryUserArgs.where = {
                OR: [
                    { username: { contains: search, mode: "insensitive" } },
                    { name: { contains: search, mode: "insensitive" } },
                    { lastname: { contains: search, mode: "insensitive" } }
                ]
            };

            countUserArgs.where = {
                OR: [
                    { username: { contains: search, mode: "insensitive" } },
                    { name: { contains: search, mode: "insensitive" } },
                    { lastname: { contains: search, mode: "insensitive" } }
                ]
            }
        };

        const totalItems = await this.repository.user.count(countUserArgs);
        if(totalItems <= 10) {
            queryUserArgs.skip = 0;
        };
        
        const users = await this.repository.user.findMany(queryUserArgs);

        const output: QueryUserOutput = {
            users: users.map((user) => {
                return {
                    id: user.id,
                    username: user.username,
                    firstName: user.name,
                    lastName: user.lastname,
                    password: user.password,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            }),
            totalItems,
            totalPages: Math.round(totalItems / take)
        };

        return output;
    };

    async update(id: string, username: string, firstName: string, lastName: string): Promise<void> {
        const user = await this.find(id);
        if(user.username !== username) {
            const usernameAlreadyExists = await this.repository.user.findUnique({ where: { username }});
            if(usernameAlreadyExists) {
                throw new HttpException("username indisponível", HttpStatus.CONFLICT);
            };
        };
        const data: Prisma.UserUpdateArgs = {
            where: { id },
            data: {
                username,
                name: firstName,
                lastname: lastName
            }
        } 
        await this.repository.user.update(data);
        return;
    };

    async updatePassword(id: string, currentPassword: string, newPassword: string): Promise<void> {
        const user = await this.find(id);

        const comparePassword = await compare(currentPassword, user.password);
        if(!comparePassword) {
            throw new HttpException("senha atual incorreta", HttpStatus.BAD_REQUEST);
        };

        const newPasswordHashed = await hash(newPassword, 10);
        const data: Prisma.UserUpdateArgs = {
            where: { id },
            data: {
                password: newPasswordHashed
            }
        };

        await this.repository.user.update(data);
        return;
    };
};
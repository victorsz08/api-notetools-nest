import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma, Role, User } from "@prisma/client";
import { PrismaService } from "src/database/prisma-service";
import { UserEntity } from "src/domain/entities/user.entity";
import { ListUserInput, ListUserOutput, UserInterface } from "src/domain/interfaces/user.interface";


@Injectable()
export class UserService implements UserInterface {
    constructor(private readonly repository: PrismaService) {};
    
    async save(user: UserEntity): Promise<void> {
        const { id, username, firstName, role, lastName, password, createdAt, updatedAt } = user;

        const usernameAlreadyExists = await this.repository.user.findUnique({ where: { username } });
        if(usernameAlreadyExists) {
            throw new HttpException("username indisponivel", HttpStatus.CONFLICT);
        };

        const data: Prisma.UserCreateInput = {
            id,
            username: username,
            name: firstName,
            lastname: lastName,
            password: password,
            role: role as Role,
            createdAt,
            updatedAt,
        };

        await this.repository.user.create({ data })
        return;
    };

    async find(id: string): Promise<UserEntity> {
        const user = await this.repository.user.findUnique({ where: { id } });

        if(!user) {
            throw new HttpException("usuário não encontrado", HttpStatus.NOT_FOUND);
        };

        const output: UserEntity = {
            id: user.id,
            username: user.username,
            firstName: user.name,
            lastName: user.lastname,
            role: user.role as Role,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        return output;
    };

    async list(query: ListUserInput): Promise<ListUserOutput> {
        const { page, perPage, search } = query;
        
        const findManyArgs: Prisma.UserFindManyArgs = {};
        if(search) {
            findManyArgs.where = {
                OR: [
                    { username: { contains: search }},
                    { name: { contains: search }},
                    { lastname: { contains: search }},
                ]
            }
        }


        const [users, totalItems] = await this.repository.$transaction([
            this.repository.user.findMany({
                where: findManyArgs.where,
                take: perPage ?? 0,
                skip: (page && perPage) ? (page - 1) * perPage : 0
            }),

            this.repository.user.count({
                where: findManyArgs.where
            })
        ]);

        const userList: UserEntity[] = users.map(user => ({
            id: user.id,
            username: user.username,
            firstName: user.name,
            lastName: user.lastname,
            role: user.role,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }));

        const totalPages = perPage ? Math.floor(totalItems / perPage) : 1;

        return {
            users: userList,
            totalItems: totalItems,
            totalPages: totalPages
        }
    };

    async update(id: string, username: string, firstName: string, lastName: string): Promise<void> {
        const user = await this.find(id);
        if(user.username !== username) {
            const usernameAlreadyExists = await this.repository.user.findUnique({ where: { username } });
            if(usernameAlreadyExists) {
                throw new HttpException("username indisponivel", HttpStatus.CONFLICT);
            };
        };

        await this.repository.user.update({
            where: { id },
            data: { 
                username, 
                name: firstName, 
                lastname: lastName 
            }
        });

        return;
    };

    updatePassword(id: string, currentPassword: string, newPassword: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
};
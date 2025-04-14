import { Body, Controller, Get, HttpCode, Param, Post, Put, Query } from "@nestjs/common";
import { UserEntity } from "src/domain/entities/user.entity";
import { UserService } from "src/services/user.service";
import { CreateUserDto } from "src/validators/user/create";
import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";
import { Role } from "src/enums/role.enum";
import { FindUserDto } from "src/validators/user/find";
import { ListUserDto } from "src/validators/user/list";
import { UpdateUserDto } from "src/validators/user/update";
import { UpdatePasswordDto } from "src/validators/user/update-password";



@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {};

    @Post()
    @HttpCode(201)
    async create(@Body() data: CreateUserDto) {
        const { username, firstName, lastName, password } = data;

        const user: UserEntity = {
            id: uuid(),
            username,
            firstName,
            lastName,
            role: Role.ADMIN,
            password: await hash(password, 10),
            createdAt: new Date(),
            updatedAt: new Date()    
        };

        await this.userService.save(user);
        return;
    };


    @Get(":id")
    @HttpCode(200)
    async find(@Param() data: FindUserDto) {
        const { id } = data;
        const response = await this.userService.find(id);

        return response;
    };

    @Get()
    @HttpCode(200)
    async list(@Query() data: ListUserDto) {
        const response = await this.userService.list(data);
        return response;
    };

    @Put(":id")
    @HttpCode(204)
    async update(@Param() params: FindUserDto, @Body() body: UpdateUserDto) {
        const { id } = params;
        const { username, firstName, lastName } = body;
        await this.userService.update(id, username, firstName, lastName);

        return;
    };

    @Put("/update-password/:id")
    @HttpCode(204)
    async updatePassword(@Param() params: FindUserDto, @Body() body: UpdatePasswordDto) {
        const { id } = params;
        const { currentPassword, newPassword } = body;

        await this.userService.updatePassword(id, currentPassword, newPassword);
        return;
    };
};
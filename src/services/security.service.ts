import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma, Role } from "@prisma/client";
import { hash } from "bcryptjs";
import { PrismaService } from "src/database/prisma-service";
import { ResetAccessOutput, SecurityInterface } from "src/domain/interfaces/security.interface";



@Injectable()
export class SecurityService implements SecurityInterface {
    constructor(private readonly repository: PrismaService) {};
    
    async grantedUser(userId: string, role: string): Promise<void> {
        const user = await this.repository.user.findUnique({ where: { id: userId }});
        if(!user) {
            throw new HttpException("usuário não encontrado", HttpStatus.NOT_FOUND);
        };

        const data: Prisma.UserUpdateInput = {
            role: role as Role
        };

        await this.repository.user.update({
            where: { id: userId },
            data
        });

        return;
    };

    async resetAccess(userId: string): Promise<ResetAccessOutput> {
        const user = await this.repository.user.findUnique({ where: { id: userId }});
        if(!user) {
            throw new HttpException("usuário não encontrado", HttpStatus.NOT_FOUND);
        };

        const passwordRandom = Math.random().toString(30).slice(-10);
        const passwordrandomHashed = await hash(passwordRandom, 10);

        const data: Prisma.UserUpdateInput = {
            password: passwordrandomHashed
        };

        await this.repository.user.update({
            where: { id: userId },
            data
        });

        const output: ResetAccessOutput = {
            newPassword: passwordRandom
        };

        return output;
    };
};
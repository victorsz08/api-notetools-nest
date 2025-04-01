import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { PrismaService } from "src/database/prisma-service";
import { AuthInterface, AuthTokenDto } from "src/domain/interfaces/auth.interface";




@Injectable()
export class AuthService implements AuthInterface {
    constructor(private readonly repository: PrismaService) {};

    async login(username: string, password: string): Promise<AuthTokenDto> {
        const user = await this.repository.user.findUnique({ where: { username } });
        if(!user) {
            throw new HttpException("usuário ou senha incorretos", HttpStatus.BAD_REQUEST);
        };

        const comparePassword = await compare(password, user.password);
        if(!comparePassword) {
            throw new HttpException("usuário ou senha incorretos", HttpStatus.BAD_REQUEST);
        };

        const token = sign({
            id: user.id,
            roles: user.role
        }, process.env.JWT_SECRET || "01111", {
            expiresIn: "1d"
        });

        const payload: AuthTokenDto = {
            token,
            expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000)
        };

        return payload;
    };
};
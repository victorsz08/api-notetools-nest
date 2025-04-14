import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { PrismaService } from "src/database/prisma-service";
import { AuthInterface } from "src/domain/interfaces/auth.interface";



@Injectable()
export class AuthService implements AuthInterface {
    constructor(private readonly repository: PrismaService) {};
    
    async login(username: string, password: string): Promise<string> {
        const user = await this.repository.user.findUnique({ where: { username }});
        if(!user) {
            throw new HttpException("username ou senha incorretos", HttpStatus.BAD_REQUEST);
        };

        const validatePassword = await compare(password, user.password);
        if(!validatePassword) {
            throw new HttpException("username ou senha incorretos", HttpStatus.BAD_REQUEST);
        };

        const payload = sign({ 
            id: user.id,
            role: user.role
        }, process.env.SECRET || "", { expiresIn: "1d" });

        return payload;
    };
}; 
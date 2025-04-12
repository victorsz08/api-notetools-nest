import { Module } from "@nestjs/common";
import { AuthController } from "src/controllers/auth.controller";
import { PrismaService } from "src/database/prisma-service";
import { AuthInterface } from "src/domain/interfaces/auth.interface";
import { AuthService } from "src/services/auth.service";



@Module({
    controllers: [AuthController],
    providers: [
        PrismaService,
        AuthService,
        {
            provide: AuthInterface,
            useClass: AuthService
        }
    ]
})

export class AuthModule {}
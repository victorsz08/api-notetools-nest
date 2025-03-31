import{ Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma-service";
import { UserInterface } from "src/domain/interfaces/user.interface";
import { UserService } from "src/services/user.service";





@Module({
    controllers: [],
    providers: [
        PrismaService,
        UserService,
        {
            provide: UserInterface,
            useClass: UserService
        }
    ]
})

export class UserModule {};
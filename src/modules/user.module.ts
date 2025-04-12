import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserController } from "src/controllers/user.controller";
import { PrismaService } from "src/database/prisma-service";
import { UserInterface } from "src/domain/interfaces/user.interface";
import { LoggerMiddleware } from "src/middlewares/auth.middleware";
import { UserService } from "src/services/user.service";






@Module({
    controllers: [
        UserController
    ],
    providers: [
        PrismaService,
        UserService,
        {
            provide: UserInterface,
            useClass: UserService
        }
    ]
})

export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(
                UserController
            )
    }
};
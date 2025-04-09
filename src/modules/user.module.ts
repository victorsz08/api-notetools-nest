import{ MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PrismaService } from "src/database/prisma-service";
import { UserInterface } from "src/domain/interfaces/user.interface";
import { LoggerMiddleware } from "src/middlewares/auth.middleware";
import { CreateUserController } from "src/presents/controllers/user/create.controller";
import { FindUserController } from "src/presents/controllers/user/find.controller";
import { ListUserController } from "src/presents/controllers/user/list.controller";
import { UpdatePasswordController } from "src/presents/controllers/user/update-password.controller";
import { UpdateUserController } from "src/presents/controllers/user/update.controller";
import { UserService } from "src/services/user.service";
import { CreateUserUsecase } from "src/usecases/user/create.usecase";
import { FindUserUsecase } from "src/usecases/user/find.usecase";
import { ListUserUsecase } from "src/usecases/user/list.usecase";
import { UpdatePasswordUsecase } from "src/usecases/user/update-password-usecase";
import { UpdateUserUsecase } from "src/usecases/user/update.usecase";





@Module({
    controllers: [
        CreateUserController,
        FindUserController,
        ListUserController,
        UpdateUserController,
        UpdatePasswordController,
    ],
    providers: [
        PrismaService,
        UserService,
        {
            provide: UserInterface,
            useClass: UserService
        },
        CreateUserUsecase,
        ListUserUsecase,
        FindUserUsecase,
        UpdateUserUsecase,
        UpdatePasswordUsecase,
    ]
})

export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(
                CreateUserController,
                FindUserController,
                ListUserController,
                UpdateUserController,
                UpdatePasswordController,
            )
    };
};
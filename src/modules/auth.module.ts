import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PrismaService } from "src/database/prisma-service";
import { AuthInterface } from "src/domain/interfaces/auth.interface";
import { UserInterface } from "src/domain/interfaces/user.interface";
import { LoggerMiddleware } from "src/middlewares/auth.middleware";
import { AuthLoginController } from "src/presents/controllers/auth/login.controller";
import { AuthSessionController } from "src/presents/controllers/auth/session.controller";
import { AuthService } from "src/services/auth.service";
import { UserService } from "src/services/user.service";
import { AuthLoginUsecase } from "src/usecases/auth/login.usecase";
import { FindUserUsecase } from "src/usecases/user/find.usecase";




@Module({
    controllers: [AuthLoginController, AuthSessionController],
    providers: [
        PrismaService,
        AuthService,
        UserService,
        {
            provide: AuthInterface,
            useClass: AuthService
        },
        {
            provide: UserInterface,
            useClass: UserService
        },
        FindUserUsecase,
        AuthLoginUsecase
    ]
})

export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(LoggerMiddleware)
        .forRoutes("auth/session");
    }
};
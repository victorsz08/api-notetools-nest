import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PrismaService } from "src/database/prisma-service";
import { SecurityInterface } from "src/domain/interfaces/security.interface";
import { LoggerMiddleware } from "src/middlewares/auth.middleware";
import { GrantedUserController } from "src/presents/controllers/security/granted-user.controller";
import { ResetAccessController } from "src/presents/controllers/security/reset-access.controller";
import { SecurityService } from "src/services/security.service";
import { GrantedUserUsecase } from "src/usecases/security/granted-user.usecase";
import { ResetAccessUsecase } from "src/usecases/security/reset-access.usecase";



@Module({
    controllers: [
        GrantedUserController,
        ResetAccessController
    ],
    providers: [
        PrismaService,
        SecurityService,
        {
            provide: SecurityInterface,
            useClass: SecurityService
        },
        GrantedUserUsecase,
        ResetAccessUsecase
    ]
})

export class SecurityModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(
                GrantedUserController,
                ResetAccessController
            )
    };
};
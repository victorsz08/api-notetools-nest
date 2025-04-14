import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { OrderController } from "src/controllers/order.controller";
import { PrismaService } from "src/database/prisma-service";
import { OrderInterface } from "src/domain/interfaces/order.interface";
import { LoggerMiddleware } from "src/middlewares/auth.middleware";
import { OrderService } from "src/services/order.service";




@Module({
    controllers: [OrderController],
    providers: [
        PrismaService,
        OrderService,
        {
            provide: OrderInterface,
            useClass: OrderService
        }
    ]
})

export class OrderModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(OrderController);
    }
}
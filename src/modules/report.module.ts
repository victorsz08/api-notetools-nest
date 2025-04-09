import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PrismaService } from "src/database/prisma-service";
import { ReportInterface } from "src/domain/interfaces/report.interface";
import { LoggerMiddleware } from "src/middlewares/auth.middleware";
import { FindReportController } from "src/presents/controllers/report/find.controller";
import { ReportService } from "src/services/report.service";
import { FindReportUsecase } from "src/usecases/report/find.usecase";




@Module({
    controllers: [
        FindReportController
    ],
    providers: [
        PrismaService,
        FindReportUsecase,
        ReportService,
        {
            provide: ReportInterface,
            useClass: ReportService
        }
    ]
})

export class ReportModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(
                FindReportController
            );
    }
};
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { NoteController } from "src/controllers/note.controller";
import { PrismaService } from "src/database/prisma-service";
import { NoteInterface } from "src/domain/interfaces/note.interface";
import { LoggerMiddleware } from "src/middlewares/auth.middleware";
import { NoteService } from "src/services/note.service";


@Module({ 
    controllers: [NoteController],
    providers: [
        PrismaService,
        NoteService,
        {
            provide: NoteInterface,
            useClass: NoteService
        }
    ]
})

export class NoteModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(NoteController)
    }
};
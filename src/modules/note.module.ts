import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma-service";
import { NoteInterface } from "src/domain/interfaces/note.interface";
import { CreateNoteController } from "src/presents/controllers/note/create.controller";
import { DeleteNoteController } from "src/presents/controllers/note/delete.controller";
import { FindNoteController } from "src/presents/controllers/note/find.controller";
import { ListNoteController } from "src/presents/controllers/note/list.controller";
import { UpdateNoteController } from "src/presents/controllers/note/update.controller";
import { NoteService } from "src/services/note.service";
import { CreateNoteUsecase } from "src/usecases/note/create.usecase";
import { DeleteNoteUsecase } from "src/usecases/note/delete.usecase";
import { FindNoteUsecase } from "src/usecases/note/find.usecase";
import { ListNoteUsecase } from "src/usecases/note/list.usecase";
import { UpdateNoteUsecase } from "src/usecases/note/update.usecase";





@Module({
    controllers: [
        CreateNoteController,
        FindNoteController,
        ListNoteController,
        UpdateNoteController,
        DeleteNoteController
    ],
    providers: [
        PrismaService,
        NoteService,
        {
            provide: NoteInterface,
            useClass: NoteService
        },
        CreateNoteUsecase,
        FindNoteUsecase,
        ListNoteUsecase,
        UpdateNoteUsecase,
        DeleteNoteUsecase
    ]
})

export class NoteModule {};
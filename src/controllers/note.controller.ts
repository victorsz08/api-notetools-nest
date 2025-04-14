import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from "@nestjs/common";
import { NoteEntity } from "src/domain/entities/note.entity";
import { NoteService } from "src/services/note.service";
import { CreateNoteDto } from "src/validators/note/create";
import { FindNoteDto } from "src/validators/note/find";
import { ListNoteDto } from "src/validators/note/list";
import { UpdateNoteDto } from "src/validators/note/update";
import { GetUserIdDto } from "src/validators/order/get-user-id";
import { v4 as uuid } from "uuid";


@Controller("notes")
export class NoteController {
    constructor(private readonly noteService: NoteService) {};

    @Post(":userId")
    @HttpCode(201)
    async create(@Param() params: GetUserIdDto, @Body() body: CreateNoteDto) {
        const { userId } = params;
        const { title, content } = body;

        const data: NoteEntity = {
            id: uuid(),
            title,
            content,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await this.noteService.save(data);
        return;
    };

    @Get(":id")
    @HttpCode(200)
    async find(@Param() params: FindNoteDto) {
        const { id } = params;
        const data = await this.noteService.find(id);

        return data;
    };

    @Get()
    @HttpCode(200)
    async list(@Query() query: ListNoteDto) {
        const data = await this.noteService.list(query);

        return data;
    };

    @Put(":id")
    @HttpCode(204)
    async update(@Param() params: FindNoteDto, @Body() body: UpdateNoteDto) {
        const { id } = params;
        const { content, title } = body;

        await this.noteService.update(id, title, content);
        return;
    };

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param() params: FindNoteDto) {
        const { id } = params;
        await this.noteService.delete(id);

        return;
    };
};

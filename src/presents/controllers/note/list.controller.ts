import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { ListNoteDto } from "src/presents/dtos/note/list.dto";
import { ListNoteUsecase } from "src/usecases/note/list.usecase";



@Controller("notes")
export class ListNoteController {
    constructor(private readonly listNoteUsecase: ListNoteUsecase) {};

    @Get()
    @HttpCode(200)
    async list(@Query() query: ListNoteDto) {
        const response = await this.listNoteUsecase.execute(query);
        return response;
    };
};
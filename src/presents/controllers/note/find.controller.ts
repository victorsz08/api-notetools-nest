import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { FindNoteDto } from "src/presents/dtos/note/find.dto";
import { FindNoteUsecase } from "src/usecases/note/find.usecase";




@Controller("notes")
export class FindNoteController {
    constructor(private readonly findNoteUsecase: FindNoteUsecase) {};

    @Get(":id")
    @HttpCode(200)
    async find(@Param() input: FindNoteDto) {
        const response = await this.findNoteUsecase.execute(input);
        return response;
    };
};
import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { FindNoteDto } from "src/presents/dtos/note/find.dto";
import { UpdateNoteDto } from "src/presents/dtos/note/update.dto";
import { UpdateNoteInputDto, UpdateNoteUsecase } from "src/usecases/note/update.usecase";




@Controller("notes")
export class UpdateNoteController {
    constructor(private readonly updateNoteUsecase: UpdateNoteUsecase) {};

    @Put(":id")
    @HttpCode(204)
    async update(@Param() params: FindNoteDto, @Body() body: UpdateNoteDto) {
        const { id } = params;
        const { content } = body;
        const input: UpdateNoteInputDto = { id, content };

        await this.updateNoteUsecase.execute(input);
        return;
    };
};
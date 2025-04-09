import { Body, Controller, HttpCode, Param, Post } from "@nestjs/common";
import { CreateNoteDto } from "src/presents/dtos/note/create.dto";
import { CreateNoteInputDto, CreateNoteUsecase } from "src/usecases/note/create.usecase";



@Controller("notes")
export class CreateNoteController {
    constructor(private readonly createNoteUsecase: CreateNoteUsecase) {};

    @Post(":userId")
    @HttpCode(201)
    async create(@Param("userId") userId: string, @Body() body: CreateNoteDto) {
        const { content } = body;
        const input: CreateNoteInputDto = { userId, content };

        await this.createNoteUsecase.execute(input);
        return;
    };
};
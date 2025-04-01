import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { FindNoteDto } from "src/presents/dtos/note/find.dto";
import { DeleteNoteUsecase } from "src/usecases/note/delete.usecase";



@Controller("notes")
export class DeleteNoteController {
    constructor(private readonly deleteNoteUsecase: DeleteNoteUsecase) {};

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param() param: FindNoteDto) {
        await this.deleteNoteUsecase.execute(param);
        return;
    };
};
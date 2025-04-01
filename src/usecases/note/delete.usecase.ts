import { NoteInterface } from "src/domain/interfaces/note.interface";
import { Usecase } from "../usecase";
import { Injectable } from "@nestjs/common";




export type DeleteNoteInputDto = {
    id: string
};

@Injectable()
export class DeleteNoteUsecase implements Usecase<DeleteNoteInputDto, void> {
    constructor(private readonly noteInterface: NoteInterface) {}
    
    
    async execute(input: DeleteNoteInputDto): Promise<void> {
        const { id } = input;

        await this.noteInterface.delete(id);
        return;
    };
};
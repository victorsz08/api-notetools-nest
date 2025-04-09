import { NoteInterface } from "src/domain/interfaces/note.interface";
import { Usecase } from "../usecase";
import { Injectable } from "@nestjs/common";



export type UpdateNoteInputDto = {
    id: string,
    content: string
};

@Injectable()
export class UpdateNoteUsecase implements Usecase<UpdateNoteInputDto, void> {
    constructor(private readonly noteInterface: NoteInterface) {}
    
    async execute(input: UpdateNoteInputDto): Promise<void> {
        const { id, content } = input;

        await this.noteInterface.update(id, content);
        return;
    };
};
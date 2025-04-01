import { NoteInterface } from "src/domain/interfaces/note.interface";
import { Usecase } from "../usecase";
import { NoteEntity } from "src/domain/entities/note.entity";


export type FindNoteInputDto = {
    id: string;
};

export type FindNoteOutputDto = {
    id: string;
    content: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

export class FindNoteUsecase implements Usecase<FindNoteInputDto, FindNoteOutputDto> {
    constructor(private readonly noteInterface: NoteInterface) {}; 
    
    async execute(input: FindNoteInputDto): Promise<FindNoteOutputDto> {
        const { id } = input;
        const note = await this.noteInterface.find(id);

        const output = this.present(note);
        return output;
    };

    private present(note: NoteEntity): FindNoteOutputDto {
        return {
            id: note.id,
            content: note.content,
            userId: note.userId,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
        };
    };
};
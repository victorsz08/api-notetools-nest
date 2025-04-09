import { NoteInterface, QueryNoteOutput } from "src/domain/interfaces/note.interface";
import { Usecase } from "../usecase";
import { Injectable } from "@nestjs/common";



export type ListNoteInputDto = {
    userId: string;
    page: number;
    startDate?: Date;
    endDate?: Date;
};

export type ListNoteOutputDto = {
    notes:{
        id: string;
        content: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    totalItems: number;
    totalPages: number;
};

@Injectable()
export class ListNoteUsecase implements Usecase<ListNoteInputDto, ListNoteOutputDto> {
    constructor(private readonly noteInterface: NoteInterface) {};
    
    async execute(input: ListNoteInputDto): Promise<ListNoteOutputDto> {
        const data = await this.noteInterface.list(input);

        const output = this.present(data);
        return output;
    };

    private present(data: QueryNoteOutput): ListNoteOutputDto {
        return {
            notes: data.notes.map((note) => ({
                id: note.id,
                content: note.content,
                userId: note.userId,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt,
            })),
            totalItems: data.totalItems,
            totalPages: data.totalPages,
        };
    };
};
import { NoteEntity } from "../entities/note.entity";

export type ListInputDto = {
    userId: string;
    page?: number;
    perPage?: number;
    startDate?: Date;
    endDate?: Date;
};

export type ListOutputDto = {
    notes: NoteEntity[];
    totalItems: number;
    totalPages: number;
};

export abstract class NoteInterface {
    abstract save(note: NoteEntity): Promise<void>;
    abstract find(id: string): Promise<NoteEntity>;
    abstract list(data: ListInputDto): Promise<ListOutputDto>;
    abstract update(id: string, title: string, content: string): Promise<void>;
    abstract delete(id: string): Promise<void>;
};
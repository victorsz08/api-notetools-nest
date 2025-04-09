import { NoteEntity } from "../entities/note.entity";


export type QueryNoteInput = {
    userId: string;
    page: number;
    startDate?: Date;
    endDate?: Date;
};

export type QueryNoteOutput = {
    notes: NoteEntity[];
    totalItems: number;
    totalPages: number;
};

export abstract class NoteInterface {
    abstract create(note: NoteEntity): Promise<void>;
    abstract find(id: string): Promise<NoteEntity>;
    abstract list(query: QueryNoteInput): Promise<QueryNoteOutput>;
    abstract update(id: string, content: string): Promise<void>;
    abstract delete(id: string): Promise<void>;
};
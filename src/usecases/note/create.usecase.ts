import { NoteInterface } from "src/domain/interfaces/note.interface";
import { Usecase } from "../usecase";
import { v4 as uuid } from "uuid";
import { Injectable } from "@nestjs/common";
import { NoteEntity } from "src/domain/entities/note.entity";


export type CreateNoteInputDto = {
    content: string;
    userId: string;
};

@Injectable()
export class CreateNoteUsecase implements Usecase<CreateNoteInputDto, void> {
    constructor(private readonly noteInterface: NoteInterface) {};

    async execute(input: CreateNoteInputDto): Promise<void> {
        const { content, userId } = input;

        const note: NoteEntity = {
            id: uuid(),
            content,
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await this.noteInterface.create(note);
        return;
    };
};
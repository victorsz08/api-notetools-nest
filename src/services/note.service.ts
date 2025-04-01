import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { addDays, startOfDay } from "date-fns";
import { PrismaService } from "src/database/prisma-service";
import { NoteEntity } from "src/domain/entities/note.entity";
import { NoteInterface, QueryNoteInput, QueryNoteOutput } from "src/domain/interfaces/note.interface";




@Injectable()
export class NoteService implements NoteInterface {
    constructor(private readonly repository: PrismaService) {}
    
    async create(note: NoteEntity): Promise<void> {
        const { id, content, createdAt, updatedAt, userId } = note;

        const user = await this.repository.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new HttpException("usuário não encontrado", HttpStatus.NOT_FOUND);
        };

        const data: Prisma.NotesCreateInput = {
            id,
            text: content,
            user: {
                connect: {
                    id: userId
                }
            },
            createdAt,
            updatedAt,
        };

        await this.repository.notes.create({ data });
        return;
    };

    async find(id: string): Promise<NoteEntity> {
        const note = await this.repository.notes.findUnique({ where: { id } });
        if (!note) {
            throw new HttpException("Nota não encontrada", HttpStatus.NOT_FOUND);
        };

        const output: NoteEntity = {
            id: note.id,
            content: note.text,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
            userId: note.user_id
        };

        return output;
    };

    async list(query: QueryNoteInput): Promise<QueryNoteOutput> {
        const { userId, page, endDate, startDate } = query;
        const take = 10;
        const skip = (page - 1) * take;

        const queryArgs: Prisma.NotesFindManyArgs = {
            where: {
                user: {
                    id: userId
                }
            },
            take,
            skip
        };

        const countArgs: Prisma.NotesCountArgs = {
            where: {
                user: {
                    id: userId
                }
            }
        };

        if(startDate && endDate) {
            queryArgs.where!.createdAt = {
                gte: addDays(startOfDay(startDate), 1),
                lte: addDays(startOfDay(endDate), 1),
            };

            countArgs.where!.createdAt = {
                gte: addDays(startOfDay(startDate), 1),
                lte: addDays(startOfDay(endDate), 1),
            };
        };

        const totalItems = await this.repository.notes.count(countArgs);
        if(totalItems <= 10) {
            queryArgs.skip = 0;
        };

        const notes = await this.repository.notes.findMany(queryArgs);

        const output: QueryNoteOutput = {
            notes: notes.map(note => ({
                id: note.id,
                content: note.text,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt,
                userId: note.user_id
            })),
            totalItems,
            totalPages: Math.ceil(totalItems / take)
        };

        return output;
    };

    async update(id: string, content: string): Promise<void> {
        await this.find(id);

        const data: Prisma.NotesUpdateInput = {
            text: content,
            updatedAt: new Date()
        };

        await this.repository.notes.update({
            where: { id },
            data
        });

        return;
    };

    async delete(id: string): Promise<void> {
        await this.find(id);
        await this.repository.notes.delete({ where: { id } });

        return;
    };
};
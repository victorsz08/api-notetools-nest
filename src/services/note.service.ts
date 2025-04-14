import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma-service";
import { NoteEntity } from "src/domain/entities/note.entity";
import { ListInputDto, ListOutputDto, NoteInterface } from "src/domain/interfaces/note.interface";



@Injectable()
export class NoteService implements NoteInterface {
    constructor(private readonly repository: PrismaService) {};
    
    async save(note: NoteEntity): Promise<void> {
        const { id, title, content, userId, createdAt, updatedAt } = note;
        
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
            updatedAt
        };

        await this.repository.notes.create({ data });
        return;
    };

    async find(id: string): Promise<NoteEntity> {
        throw new Error("Method not implemented.");
    };

    async list(data: ListInputDto): Promise<ListOutputDto> {
        const { 
            userId,
            page,
            perPage,
            startDate,
            endDate
        } = data;

        const queryArgs: Prisma.NotesFindManyArgs = {
            where: {
                user: { id: userId },
            }
        };

        if (startDate && endDate) {
            queryArgs.where = {
                ...queryArgs.where,
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDate)
                }
            }
        };

        if(page && perPage) {
            queryArgs.skip = (page - 1) * perPage;
            queryArgs.take = perPage;
        };

        const [notes, total] =await this.repository.$transaction([
            this.repository.notes.findMany(queryArgs),
            this.repository.notes.count({
                where: queryArgs.where
            })
        ]);

        const totalPages = (page && perPage) ? Math.ceil(total / perPage) : 1;

        return {
            notes: notes.map(note => ({
                id: note.id,
                title: "",
                content: note.text,
                userId: note.user_id,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt
            })),
            totalItems: total,
            totalPages
        };
    };

    async update(id: string, title: string, content: string): Promise<void> {
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
        await this.repository.notes.delete({
            where: { id }
        });
        
        return;
    };
};
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma, Status } from "@prisma/client";
import { PrismaService } from "src/database/prisma-service";
import { OrderEntity } from "src/domain/entities/order.entity";
import { ListInputDto, ListOutputDto, OrderInterface } from "src/domain/interfaces/order.interface";
import { StatusType } from "src/enums/status.enum";






@Injectable()
export class OrderService implements OrderInterface {
    constructor(private readonly repository: PrismaService) {};
    
    async save(order: OrderEntity): Promise<void> {
        const { 
            id, 
            number, 
            local, 
            observation, 
            price, 
            contact, 
            schedulingDate, 
            schedulingTime,
            status,
            userId,
            createdAt,
            updatedAt 
        } = order;

        const user = await this.repository.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new HttpException("usuário não encontrado", HttpStatus.NOT_FOUND)
        };

        const data: Prisma.ContractCreateInput = {
            id, 
            number, 
            local,  
            price, 
            phone: contact, 
            installationDate: schedulingDate, 
            installationHour: schedulingTime,
            status: status as Status,
            user: {
                connect: { id: userId }
            },
            products: [],
            createdAt,
            updatedAt 
        };

        await this.repository.contract.create({ data });
        return;
    };

    async find(id: string): Promise<OrderEntity> {
        const order = await this.repository.contract.findUnique({
            where: { id },
        });

        if (!order) {
            throw new HttpException("Contrato não encontrado", HttpStatus.NOT_FOUND);
        };

        return {
            id: order.id,
            number: order.number,
            local: order.local,
            observation: "",
            price: order.price,
            contact: order.phone,
            schedulingDate: order.installationDate,
            schedulingTime: order.installationHour,
            status: order.status as StatusType,
            userId: order.userId,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        };
    };

    async list(data: ListInputDto): Promise<ListOutputDto> {
        const { 
            page, 
            perPage, 
            userId, 
            createDateIn, 
            createDateOut, 
            schedulingDateIn, 
            schedulingDateOut, 
            status 
        } = data;

        const queryArgs: Prisma.ContractFindManyArgs = {
            where: {
                user: { id: userId },
            }
        };

        if(schedulingDateIn && schedulingDateOut) {
            queryArgs.where = {
                ...queryArgs.where,
                installationDate: {
                    gte: schedulingDateIn,
                    lte: schedulingDateOut
                }
            };
        };

        if(createDateIn && createDateOut) {
            queryArgs.where = {
                ...queryArgs.where,
                createdAt: {
                    gte: createDateIn,
                    lte: createDateOut
                }
            };
        };
        if(status) {
            queryArgs.where = {
                ...queryArgs.where,
                status: status as Status
            };
        }

        if(page && perPage) {
            queryArgs.skip = (page - 1) * perPage;
            queryArgs.take = perPage;
        };

        const [orders, total] = await this.repository.$transaction([
            this.repository.contract.findMany(queryArgs),
            this.repository.contract.count({
                where: queryArgs.where
            })
        ]);
        const totalPages = (perPage && page) ? Math.ceil(total / perPage) : 1;

        return {
            orders: orders.map(order => ({
                id: order.id,
                number: order.number,
                local: order.local,
                observation: "",
                price: order.price,
                contact: order.phone,
                schedulingDate: order.installationDate,
                schedulingTime: order.installationHour,
                status: order.status as StatusType,
                userId: order.userId,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt
            })),
            totalItems: total,
            totalPages: totalPages
        }
    };

    async updateScheduling(id: string, schedulingDate: Date, schedulingTime: string): Promise<void> {
        await this.find(id);

        await this.repository.contract.update({
            where: { id },
            data: {
                installationDate: schedulingDate,
                installationHour: schedulingTime
            }
        });
        return;
    };

    async updateStatus(id: string, status: StatusType): Promise<void> {
        await this.find(id);

        await this.repository.contract.update({
            where: { id },
            data: {
                status: status as Status
            }
        });

        return;
    };

    async update(id: string, number: number, local: string, observation: string, price: number, contact: string): Promise<void> {
        await this.find(id);

        await this.repository.contract.update({
            where: { id },
            data: {
                number,
                local,
                phone: contact,
                price
            }
        });

        return;
    };

    async delete(id: string): Promise<void> {
        await this.find(id);

        await this.repository.contract.delete({
            where: { id }
        });

        return;
    };
};
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma, Status } from "@prisma/client";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { PrismaService } from "src/database/prisma-service";
import { ContractEntity, StatusType } from "src/domain/entities/contract.entity";
import { ContractInterface, QueryContractInput, QueryContractOutput } from "src/domain/interfaces/contract.interface";




@Injectable()
export class ContractService implements ContractInterface {
    
    constructor(private readonly repository: PrismaService) {};
    
    async create(contract: ContractEntity): Promise<void> {
        const { 
            id,
            number,
            local,
            observation,
            price,
            contact,
            status,
            schedulingDate,
            schedulingTime,
            createdAt,
            updatedAt,
            userId
        } = contract;

        const user = await this.repository.user.findUnique({ where: { id: userId }});
        if(!user) {
            throw new HttpException("usuário não encontrado", HttpStatus.NOT_FOUND);
        };

        const data: Prisma.ContractCreateInput = {
            id,
            number,
            local,
            installationDate: schedulingDate,
            installationHour :schedulingTime,
            price,
            products: [],
            phone: contact,
            status: status as Status,
            User: {
                connect: {
                    id: userId
                }
            },
            createdAt,
            updatedAt
        };

        await this.repository.contract.create({ data });
        return;
    };

    async find(id: string): Promise<ContractEntity> {
        const contract = await this.repository.contract.findUnique({ where: { id } });

        if(!contract) {
            throw new HttpException("contrato não encontrado", HttpStatus.NOT_FOUND);
        };

        const output: ContractEntity = {
            id: contract.id,
            number: contract.number,
            local: contract.local,
            observation: "",
            schedulingDate: contract.installationDate,
            schedulingTime: contract.installationHour,
            price: contract.price,
            contact: contract.phone,
            userId: contract.userId,
            status: contract.status as StatusType,
            createdAt: contract.createdAt,
            updatedAt: contract.updatedAt,
        };

        return output;
    };

    async list(query: QueryContractInput): Promise<QueryContractOutput> {
        const { 
            userId, 
            page, 
            createdAtDateIn,
            createdAtDateOut,
            schedulingDateIn,
            schedulingDateOut,
            status,
            orderBy
         } = query;
         const take = 10;
         const skip = (page - 1) * take;

         const queryArgs: Prisma.ContractFindManyArgs = {
            where: {
                User: {
                    id: userId
                }
            },
            take,
            skip,
            orderBy: {
                createdAt: "asc"
            }
         };

         const countArgs: Prisma.ContractCountArgs = {
            where: {
                User: {
                    id: userId
                }
            }
         };

         if(createdAtDateIn && createdAtDateOut) {
            queryArgs.where = {
                createdAt: {
                    gte: startOfDay(createdAtDateIn),
                    lte: subDays(endOfDay(createdAtDateOut), 1)
                }
            };

            countArgs.where = {
                createdAt: {
                    gte: startOfDay(createdAtDateIn),
                    lte: subDays(endOfDay(createdAtDateOut), 1)
                }
            };
         };

         if(schedulingDateIn && schedulingDateOut) {
            queryArgs.where = {
                installationDate: {
                    gte: startOfDay(schedulingDateIn),
                    lte: subDays(endOfDay(schedulingDateOut), 1)
                }
            };

            countArgs.where = {
                installationDate: {
                    gte: startOfDay(schedulingDateIn),
                    lte: subDays(endOfDay(schedulingDateOut), 1)
                }
            };
         };

         if(status) {
            queryArgs.where = {
                status: status as Status
            };

            countArgs.where = {
                status: status as Status
            };
         };

         if(orderBy) {
            queryArgs.orderBy = {
                createdAt: orderBy
            };
         };


         const totalItems = await this.repository.contract.count(countArgs);
         
         if(totalItems <= 10) {
            queryArgs.skip = 0;
         };

         const contracts = await this.repository.contract.findMany(queryArgs);

         const output: QueryContractOutput = {
            contracts: contracts.map(contract => {
                return {
                    id: contract.id,
                    number: contract.number,
                    local: contract.local,
                    observation: "",
                    schedulingDate: contract.installationDate,
                    schedulingTime: contract.installationHour,
                    price: contract.price,
                    contact: contract.phone,
                    userId: contract.userId,
                    status: contract.status as StatusType,
                    createdAt: contract.createdAt,
                    updatedAt: contract.updatedAt
                }
            }),
            totalItems,
            totalPages: Math.ceil(totalItems / take)
         };

         return output;
    };

    async update(id: string, number: number, local: string, observation: string, price: number, contact: string): Promise<void> {
        await this.find(id);
        const data: Prisma.ContractUpdateInput = {
            number,
            local,
            price,
            phone: contact,
            updatedAt: new Date()
        };

        await this.repository.contract.update({
            where: { id },
            data
        });

        return;
    };

    async updateStatus(id: string, status: StatusType): Promise<void> {
        await this.find(id);
        const data: Prisma.ContractUpdateInput = {
            status: status as Status,
            updatedAt: new Date()
        };

        await this.repository.contract.update({
            where: { id },
            data
        });
        return;
    };

    async updateScheduling(id: string, schedulingDate: Date, schedulingTime: string): Promise<void> {
        await this.find(id);
        const data: Prisma.ContractUpdateInput = {
            installationDate: schedulingDate,
            installationHour: schedulingTime,
            updatedAt: new Date()
        };

        await this.repository.contract.update({
            where: { id },
            data
        });
        return;
    };

    async delete(id: string): Promise<void> {
        await this.find(id);
        await this.repository.contract.delete({ where: { id } });

        return;
    };
};
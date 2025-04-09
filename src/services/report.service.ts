import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { endOfDay, startOfDay } from "date-fns";
import { PrismaService } from "src/database/prisma-service";
import { ReportEntity } from "src/domain/entities/report.entity";
import { ReportInterface } from "src/domain/interfaces/report.interface";





@Injectable()
export class ReportService implements ReportInterface {
    
    constructor(private readonly repository: PrismaService) {};
    
    async find(userId: string, startDate: string, endDate: string): Promise<ReportEntity> {
        const user = await this.repository.user.findUnique({ where: { id: userId } });
        if(!user) throw new HttpException("usuário não encontrado", HttpStatus.BAD_GATEWAY);

        const queryArgs: Prisma.ContractFindManyArgs = {
            
        };

        const contracts = await this.repository.contract.findMany({
            where: {
                user: {
                     id: userId
                },
                createdAt: {
                    gte: startOfDay(new Date(startDate)),
                    lte: endOfDay(new Date(endDate))
                }
            }
        });

        const total = contracts.length;
        const revenue = contracts.reduce((acc, contract) => acc + contract.price, 0);
        const connected = contracts.filter(contract => contract.status === "CONECTADO").length;
        const pending = contracts.filter(contract => contract.status === "PENDENTE").length;
        const cancelled = contracts.filter(contract => contract.status === "CANCELADO").length;
        const conectedRate = connected / (connected + cancelled);
        const cancelledRate = cancelled / (connected + cancelled);

        return {
            total,
            revenue,
            connected,
            pending,
            cancelled,
            conectedRate,
            cancelledRate
        };
    }
};
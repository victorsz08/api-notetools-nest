import { ContractEntity, StatusType } from "src/domain/entities/contract.entity";
import { Usecase } from "../usecase";
import { ContractInterface, QueryContractOutput } from "src/domain/interfaces/contract.interface";
import { Injectable } from "@nestjs/common";


export type ListContractInputDto = {
    userId: string;
    page: number;
    createAtDateIn?: Date;
    createAtDateOut?: Date;
    schedulingDateIn?: Date;
    schedulingDateOut?: Date;
    status?: StatusType;
    orderBy?: "asc" | "desc";
};


export type ListContractOutputDto = {
    contracts: {
        id: string;
        number: number;
        local: string;
        schedulingDate: Date;
        schedulingTime: string;
        price: number;
        status: StatusType;
        contact: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    totalItems: number;
    totalPages: number;
};

@Injectable()
export class ListContractUsecase implements Usecase<ListContractInputDto, ListContractOutputDto> {
    
    constructor(private readonly contractInterface: ContractInterface) {};
    
    async execute(input: ListContractInputDto): Promise<ListContractOutputDto> {
        const data = await this.contractInterface.list(input);

        const output = this.presents(data);
        return output;
    };

    private presents(data: QueryContractOutput): ListContractOutputDto {
        return {
            contracts: data.contracts.map((contract) => ({
                id: contract.id,
                number: contract.number,
                local: contract.local,
                schedulingDate: contract.schedulingDate,
                schedulingTime: contract.schedulingTime,
                price: contract.price,
                status: contract.status,
                contact: contract.contact,
                userId: contract.userId,
                createdAt: contract.createdAt,
                updatedAt: contract.updatedAt,
            })),
            totalItems: data.totalItems,
            totalPages: data.totalPages,
        };
    };
};
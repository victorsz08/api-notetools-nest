import { ContractEntity, StatusType } from "src/domain/entities/contract.entity";
import { Usecase } from "../usecase";
import { ContractInterface } from "src/domain/interfaces/contract.interface";
import { Injectable } from "@nestjs/common";



export type FindContractInputDto = {
    id: string;
};

export type FindContractOutputDto = {
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
};

@Injectable()
export class FindContractUsecase implements Usecase<FindContractInputDto, FindContractOutputDto> {
    constructor(private readonly contractInterface: ContractInterface) {}
    
    async execute(input: FindContractInputDto): Promise<FindContractOutputDto> {
        const { id } = input;
        const contract = await this.contractInterface.find(id);
        
        const output = this.presents(contract);
        return output;
    };

    private presents(contract: ContractEntity): FindContractOutputDto {
        return {
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
        };
    };
};
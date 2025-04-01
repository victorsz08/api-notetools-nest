import { ContractInterface } from "src/domain/interfaces/contract.interface";
import { Usecase } from "../usecase";
import { v4 as uuid } from "uuid";
import { ContractEntity, StatusType } from "src/domain/entities/contract.entity";
import { Injectable } from "@nestjs/common";


export type CreateContractInputDto = {
    number: number;
    local: string;
    observation?: string;
    schedulingDate:  Date;
    schedulingTime: string;
    price: number;
    contact: string;
    userId: string;
};

@Injectable()
export class CreateContractUsecase implements Usecase<CreateContractInputDto, void> {
    
    constructor(private readonly contractInterface: ContractInterface) {};
    
    async execute(input: CreateContractInputDto): Promise<void> {
        const {
            number,
            local,
            observation,
            schedulingDate,
            schedulingTime,
            price,
            contact,
            userId
        } = input;

        const contract: ContractEntity = {
            id: uuid(),
            number,
            local,
            observation: observation ?? "",
            schedulingDate,
            schedulingTime,
            status: StatusType.PENDENTE,
            price,
            contact,
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await this.contractInterface.create(contract);
        return;
    };
};
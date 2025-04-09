import { ContractEntity, StatusType } from "../entities/contract.entity";

export type QueryContractInput = {
    userId: string;
    page: number;
    createdAtDateIn?: Date;
    createdAtDateOut?: Date;
    schedulingDateIn?: Date;
    schedulingDateOut?: Date;
    status?: StatusType;
    orderBy?: "asc" | "desc";
};

export type QueryContractOutput = {
    contracts: ContractEntity[];
    totalItems: number;
    totalPages: number;
};

export abstract class ContractInterface {
    abstract create(contract: ContractEntity): Promise<void>;
    abstract find(id: string): Promise<ContractEntity>;
    abstract list(query: QueryContractInput): Promise<QueryContractOutput>;
    abstract update(id: string, number: number, local: string, observation: string, price: number, contact: string): Promise<void>;
    abstract updateStatus(id: string, status: StatusType): Promise<void>;
    abstract updateScheduling(id: string, schedulingDate: Date, schedulingTime: string): Promise<void>;
    abstract delete(id: string): Promise<void>;
};
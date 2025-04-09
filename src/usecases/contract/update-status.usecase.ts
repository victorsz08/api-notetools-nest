import { StatusType } from "src/domain/entities/contract.entity";
import { Usecase } from "../usecase";
import { ContractInterface } from "src/domain/interfaces/contract.interface";
import { Injectable } from "@nestjs/common";



export type UpdateStatusInputDto = {
    id: string;
    status: StatusType;
};


@Injectable()
export class UpdateStatusUsecase implements Usecase<UpdateStatusInputDto, void> {

    constructor(private readonly contractInterface: ContractInterface) {};
    
    async execute(input: UpdateStatusInputDto): Promise<void> {
        const { id, status } = input;

        await this.contractInterface.updateStatus(id, status);
        return;
    };
};
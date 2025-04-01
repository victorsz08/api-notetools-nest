import { ContractInterface } from "src/domain/interfaces/contract.interface";
import { Usecase } from "../usecase";
import { Injectable } from "@nestjs/common";



export type DeleteContractInputDto = {
    id: string;
};

@Injectable()
export class DeleteContractUsecase implements Usecase<DeleteContractInputDto, void> {
    
    constructor(private readonly contractInterface: ContractInterface) {};
    
    async execute(input: DeleteContractInputDto): Promise<void> {
        const { id } = input;

        await this.contractInterface.delete(id);
        return;
    };
};
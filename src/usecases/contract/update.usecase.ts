import { ContractInterface } from "src/domain/interfaces/contract.interface";
import { Usecase } from "../usecase";
import { Injectable } from "@nestjs/common";



export type UpdateContractInputDto = {
    id: string;
    number: number;
    local: string;
    observation: string;
    price: number;
    contact: string;
};

@Injectable()
export class UpdateContractUsecase implements Usecase<UpdateContractInputDto, void> {
    
    constructor(private readonly contractInterface: ContractInterface) {};
    
    async execute(input: UpdateContractInputDto): Promise<void> {
        const { 
            id,
            number,
            local,
            observation,
            price,
            contact,
        } = input;

        await this.contractInterface.update(id, number, local, observation, price, contact);
        return;
    };
};
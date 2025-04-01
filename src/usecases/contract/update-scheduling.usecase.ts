import { ContractInterface } from "src/domain/interfaces/contract.interface";
import { Usecase } from "../usecase";
import { Injectable } from "@nestjs/common";


export type UpdateSchedulingInputDto = {
    id: string;
    schedulingDate: Date;
    schedulingTime: string;
};

@Injectable()
export class UpdateSchedulingUsecase implements Usecase<UpdateSchedulingInputDto, void> {
    
    constructor(private readonly contractInterface: ContractInterface) {};
    
    async execute(input: UpdateSchedulingInputDto): Promise<void> {
        const { id, schedulingDate, schedulingTime } = input;

        await this.contractInterface.updateScheduling(id, schedulingDate, schedulingTime);
        return;
    };
};
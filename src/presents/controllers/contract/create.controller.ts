import { Body, Controller, HttpCode, Param, Post } from "@nestjs/common";
import { CreateContractDto } from "src/presents/dtos/contract/create.dto";
import { CreateContractInputDto, CreateContractUsecase } from "src/usecases/contract/create.usecase";



@Controller("contracts")
export class CreateContractController {
    constructor(private readonly createContractUsecase: CreateContractUsecase) {};

    @Post(":userId")
    @HttpCode(201)
    async create(@Param() userId: string, @Body() body: CreateContractDto) {
        const { 
            number, 
            local, 
            schedulingDate, 
            schedulingTime,
            contact, 
            observation,
            price
        } = body;
        
        const input: CreateContractInputDto = {
            userId,
            number,
            local,
            schedulingDate,
            schedulingTime,
            contact,
            observation,
            price
        };

        await this.createContractUsecase.execute(input);
        return;
    };
};
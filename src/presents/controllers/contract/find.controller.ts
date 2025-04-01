import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { FindContractDto } from "src/presents/dtos/contract/find.dto";
import { FindContractUsecase } from "src/usecases/contract/find.usecase";




@Controller("contracts")
export class FindContractController {
    constructor(private readonly findContractUsecase: FindContractUsecase) {};

    @Get(":id")
    @HttpCode(200)
    async find(@Param() input: FindContractDto) {
        const response = await this.findContractUsecase.execute(input);
        return response;
    };
};
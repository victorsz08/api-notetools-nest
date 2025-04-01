import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { ListContractDto } from "src/presents/dtos/contract/list.dto";
import { ListContractUsecase } from "src/usecases/contract/list.usecase";




@Controller("contracts")
export class ListContractController {
    constructor(private readonly listContractUsecase: ListContractUsecase) {};

    @Get()
    @HttpCode(200)
    async list(@Query() query: ListContractDto) {
        const response = await this.listContractUsecase.execute(query);
        return response;
    };
};
import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { FindContractDto } from "src/presents/dtos/contract/find.dto";
import { UpdateContractDto } from "src/presents/dtos/contract/update.dto";
import { UpdateContractInputDto, UpdateContractUsecase } from "src/usecases/contract/update.usecase";




@Controller("contracts")
export class UpdateContractController {
    constructor(private readonly updateContractUsecase: UpdateContractUsecase) {};

    @Put(":id")
    @HttpCode(204)
    async update(@Param() params: FindContractDto, @Body() body: UpdateContractDto) {
        const {
            number,
            local,
            contact,
            price,
            observation
        } = body;

        const input: UpdateContractInputDto = {
            id: params.id,
            number,
            local,
            contact,
            price,
            observation
        };

        await this.updateContractUsecase.execute(input);
        return;
    };
};
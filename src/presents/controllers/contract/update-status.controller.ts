import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { FindContractDto } from "src/presents/dtos/contract/find.dto";
import { UpdateStatusDto } from "src/presents/dtos/contract/update-status.dto";
import { UpdateStatusInputDto, UpdateStatusUsecase } from "src/usecases/contract/update-status.usecase";



@Controller("contracts/status")
export class UpdateStatusController {
    constructor(private readonly updateStatusUsecase: UpdateStatusUsecase) {};

    @Put(":id")
    @HttpCode(204)
    async updateStatus(@Param() params: FindContractDto, @Body() body: UpdateStatusDto) {
        const { status } = body;
        const input: UpdateStatusInputDto = { id: params.id, status };

        await this.updateStatusUsecase.execute(input);
        return;
    };
};
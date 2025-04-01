import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { FindContractDto } from "src/presents/dtos/contract/find.dto";
import { UpdateSchedulingDto } from "src/presents/dtos/contract/update-scheduling.dto";
import { UpdateSchedulingInputDto, UpdateSchedulingUsecase } from "src/usecases/contract/update-scheduling.usecase";



@Controller("contracts/scheduling")
export class UpdateSchedulingController {
    constructor(private readonly updateSchedulingUsecase: UpdateSchedulingUsecase) {};

    @Put(":id")
    @HttpCode(204)
    async updateScheduling(@Param() params: FindContractDto, @Body() body: UpdateSchedulingDto) {
        const { id } = params;
        const { schedulingDate, schedulingTime } = body;
        const input: UpdateSchedulingInputDto = { id, schedulingDate, schedulingTime };

        await this.updateSchedulingUsecase.execute(input);
        return;
    };
};

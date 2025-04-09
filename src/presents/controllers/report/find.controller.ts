import { Controller, Get, HttpCode, Param, Query } from "@nestjs/common";
import { Roles } from "src/decorators/role.decorator";
import { FindReportDto } from "src/presents/dtos/report/find.dto";
import { FindReportUsecase } from "src/usecases/report/find.usecase";





@Controller("reports")
export class FindReportController {

    constructor(private readonly findReportUsecase: FindReportUsecase) {};

    @Get()
    @HttpCode(200)
    async find(@Query() params: FindReportDto) {
        const output = await this.findReportUsecase.execute(params);
        return output;
    }
}
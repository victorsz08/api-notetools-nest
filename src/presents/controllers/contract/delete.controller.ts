import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { FindContractDto } from "src/presents/dtos/contract/find.dto";
import { DeleteContractUsecase } from "src/usecases/contract/delete.usecase";



@Controller("contracts")
export class DeleteContractController {
    constructor(private readonly deleteContractUsecase: DeleteContractUsecase) {};

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param() param: FindContractDto) {
        await this.deleteContractUsecase.execute(param);
        return;
    };
};
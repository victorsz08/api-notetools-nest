import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma-service";
import { ContractInterface } from "src/domain/interfaces/contract.interface";
import { CreateContractController } from "src/presents/controllers/contract/create.controller";
import { DeleteContractController } from "src/presents/controllers/contract/delete.controller";
import { FindContractController } from "src/presents/controllers/contract/find.controller";
import { ListContractController } from "src/presents/controllers/contract/list.controller";
import { UpdateSchedulingController } from "src/presents/controllers/contract/update-scheduling.controller";
import { UpdateStatusController } from "src/presents/controllers/contract/update-status.controller";
import { UpdateContractController } from "src/presents/controllers/contract/update.controller";
import { ContractService } from "src/services/contract.service";
import { CreateContractUsecase } from "src/usecases/contract/create.usecase";
import { DeleteContractUsecase } from "src/usecases/contract/delete.usecase";
import { FindContractUsecase } from "src/usecases/contract/find.usecase";
import { ListContractUsecase } from "src/usecases/contract/list.usecase";
import { UpdateSchedulingUsecase } from "src/usecases/contract/update-scheduling.usecase";
import { UpdateStatusUsecase } from "src/usecases/contract/update-status.usecase";
import { UpdateContractUsecase } from "src/usecases/contract/update.usecase";




@Module({
    controllers: [
        CreateContractController,
        ListContractController,
        FindContractController,
        UpdateContractController,
        UpdateSchedulingController,
        UpdateStatusController,
        DeleteContractController
    ],
    providers: [
        PrismaService,
        ContractService,
        {
            provide: ContractInterface,
            useClass: ContractService
        },
        CreateContractUsecase,
        FindContractUsecase,
        ListContractUsecase,
        UpdateContractUsecase,
        UpdateStatusUsecase,
        UpdateSchedulingUsecase,
        DeleteContractUsecase
    ]
})

export class ContractModule {};
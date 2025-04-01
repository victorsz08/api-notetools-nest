import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { ResetAccessOutput, SecurityInterface } from "src/domain/interfaces/security.interface";


export type ResetAccessInputDto = {
    userId: string;
};

export type ResetAccessOutputDto = {
    newPassword: string;
};

@Injectable()
export class  ResetAccessUsecase implements Usecase<ResetAccessInputDto, ResetAccessOutputDto> {
    constructor(private readonly securityInterface: SecurityInterface) {};
    
    async execute(input: ResetAccessInputDto): Promise<ResetAccessOutputDto> {
        const { userId } = input;
        const access = await this.securityInterface.resetAccess(userId);
        
        const output = this.present(access);
        return output;
    }; 

    private present(data: ResetAccessOutput): ResetAccessOutputDto {
        return {
            newPassword: data.newPassword
        };
    };
};
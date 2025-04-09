import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { SecurityInterface } from "src/domain/interfaces/security.interface";


export type GrantedUserInputDto = {
    userId: string;
    role: string;
};

@Injectable()
export class GrantedUserUsecase implements Usecase<GrantedUserInputDto, void> {
    
    constructor(private readonly securityInterface: SecurityInterface) {};
    
    async execute(input: GrantedUserInputDto): Promise<void> {
        const { userId, role } = input;
        
        await this.securityInterface.grantedUser(userId, role);
        return;
    };
};
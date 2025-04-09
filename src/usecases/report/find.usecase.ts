import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { ReportInterface } from "src/domain/interfaces/report.interface";
import { ReportEntity } from "src/domain/entities/report.entity";



export type FindReportInputDto = {
    userId: string;
    startDate: string;
    endDate: string;
};

export type FindReportOutputDto = {
    total: number;
    revenue: number;
    connected: number;
    pending: number;
    cancelled: number;
    conectedRate: number;
    cancelledRate: number;
};

@Injectable()
export class FindReportUsecase implements Usecase<FindReportInputDto, FindReportOutputDto> {
    
    constructor(private readonly reportInterface: ReportInterface) {};
    
    async execute(input: FindReportInputDto): Promise<FindReportOutputDto> {
        const { userId, startDate, endDate } = input;
        const report = await this.reportInterface.find(userId, startDate, endDate);

        const output = this.present(report);
        return output;
    };

    private present(report: ReportEntity): FindReportOutputDto {
        return {
            total: report.total,
            revenue: report.revenue,
            connected: report.connected,
            pending: report.pending,
            cancelled: report.cancelled,
            conectedRate: report.conectedRate,
            cancelledRate: report.cancelled
        };
    };
};
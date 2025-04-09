import { ReportEntity } from "../entities/report.entity";



export abstract class ReportInterface {
    abstract find(userId: string, startDate: string, endDate: string): Promise<ReportEntity>;
};
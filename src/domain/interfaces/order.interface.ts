import { StatusType } from "src/enums/status.enum";
import { OrderEntity } from "../entities/order.entity";

export type ListInputDto = {
    userId: string;
    page?: number;
    perPage?: number;
    local?: string;
    schedulingDateIn?: Date;
    schedulingDateOut?: Date;
    createDateIn?: Date;
    createDateOut?: Date;
    status?: StatusType;  
};

export type ListOutputDto = {
    orders: OrderEntity[];
    totalItems: number;
    totalPages: number;
};


export abstract class OrderInterface {
    abstract save(order: OrderEntity): Promise<void>;
    abstract find(id: string): Promise<OrderEntity>;
    abstract list(data: ListInputDto): Promise<ListOutputDto>
    abstract updateScheduling(id: string, schedulingDate: Date, schedulingTime: string): Promise<void>;
    abstract updateStatus(id: string, status: StatusType): Promise<void>;
    abstract update(
        id: string, 
        number: number, 
        local: string, 
        observation: string, 
        price: number, 
        contact: string
    ): Promise<void>;
    abstract delete(id: string): Promise<void>;
};
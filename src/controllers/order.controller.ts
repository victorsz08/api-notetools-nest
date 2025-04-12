import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from "@nestjs/common";
import { OrderEntity } from "src/domain/entities/order.entity";
import { StatusType } from "src/enums/status.enum";
import { OrderService } from "src/services/order.service";
import { CreateOrderDto } from "src/validators/order/create";
import { FindOrderDto } from "src/validators/order/find";
import { GetUserIdDto } from "src/validators/order/get-user-id";
import { ListOrderDto } from "src/validators/order/list";
import { UpdateOrderDto } from "src/validators/order/update";
import { UpdateSchedulingDto } from "src/validators/order/update-scheduling";
import { v4 as uuid } from "uuid";



@Controller("orders")
export class OrderController {
    constructor(private readonly orderService: OrderService) {};

    @Post(":userId")
    @HttpCode(201)
    async create(@Param() params: GetUserIdDto, @Body() body: CreateOrderDto) {
        const { userId } = params;
        const { number, local, schedulingDate, schedulingTime, contact, observation, price } = body;

        const data: OrderEntity = {
            id: uuid(),
            userId,
            number,
            local,
            schedulingDate,
            schedulingTime,
            contact,
            observation,
            price,
            status: StatusType.PENDENTE,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await this.orderService.save(data);
        return;
    };

    @Get(":id")
    @HttpCode(200)
    async find(@Param() params: FindOrderDto) {
        const { id } = params;
        const order = await this.orderService.find(id);

        return order;
    };

    @Get()
    @HttpCode(200)
    async list(@Query() query: ListOrderDto) {
        const data = await this.orderService.list(query);
        return data;
    };

    @Put("update-scheduling/:id")
    @HttpCode(204)
    async updateScheduling(@Body() body: UpdateSchedulingDto, @Param() param: FindOrderDto) {
        const { id } = param;
        const { schedulingDate, schedulingTime } = body;

        await this.orderService.updateScheduling(id, schedulingDate, schedulingTime);
        return;
    };

    @Put("update-status/:id")
    @HttpCode(204)
    async updateStatus(@Body() body: { status: StatusType }, @Param() param: FindOrderDto) {
        const { id } = param;
        const { status } = body;

        await this.orderService.updateStatus(id, status);
        return;
    }

    @Put(":id")
    @HttpCode(204)
    async update(@Body() body: UpdateOrderDto, @Param() param: FindOrderDto) {
        const { id } = param;
        const { number, local, observation, price, contact } = body;

        await this.orderService.update(
            id, 
            number, 
            local, 
            observation, 
            price, 
            contact
        );

        return;
    };

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param() param: FindOrderDto) {
        const { id } = param;
        await this.orderService.delete(id);
        return;
    };
};
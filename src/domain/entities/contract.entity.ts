
export type StatusType = "pendente" | "conectado" | "cancelado" | "reagendar";

export const StatusType = {
    PENDENTE: "pendente" as StatusType,
    CONECTADO: "conectado" as StatusType,
    CANCELADO: "cancelado" as StatusType,
    REAGENDAR: "reagendar" as StatusType
 } as const;

export class ContractEntity {
    readonly id: string;
    readonly number: number;
    readonly local: string;
    readonly observation: string;
    readonly schedulingDate: Date;
    readonly schedulingTime: string;
    readonly price: number;
    readonly status: StatusType;
    readonly contact: string;
    readonly userId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
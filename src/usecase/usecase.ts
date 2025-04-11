



export abstract class Usecase<InputDto, OutputDto> {
    abstract execute(data: InputDto): Promise<OutputDto>;
};
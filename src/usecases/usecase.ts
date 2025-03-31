



export abstract class Usecase<InputDto, OutputDto> {
    abstract execute(input: InputDto): Promise<OutputDto>;
};
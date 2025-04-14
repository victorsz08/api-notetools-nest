

export abstract class AuthInterface {
    abstract login(username: string, password: string): Promise<string>;
};
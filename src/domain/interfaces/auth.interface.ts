import { UserEntity } from "../entities/user.entity";

export type AuthTokenDto = {
    token: string;
    expiresIn: Date;
}

export abstract class AuthInterface {
    abstract login(username: string, password: string): Promise<AuthTokenDto>;
};
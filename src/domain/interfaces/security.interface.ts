
export type ResetAccessOutput = {
    newPassword: string;
};

export abstract class SecurityInterface {
    abstract grantedUser(userId: string, role: string): Promise<void>;
    abstract resetAccess(userId: string): Promise<ResetAccessOutput>;
};
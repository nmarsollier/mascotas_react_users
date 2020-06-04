export declare function getCurrentToken(): string | undefined;
export declare function getCurrentUser(): User | undefined;
export declare function logout(): Promise<void>;
export interface Login {
    login: string;
    password: string;
}
export interface IToken {
    token: string;
}
export declare function login(payload: Login): Promise<IToken>;
export interface User {
    id: string;
    name: string;
    login: string;
    permissions: string[];
}
export declare function reloadCurrentUser(): Promise<User>;
export interface SignUpRequest {
    name: string;
    password: string;
    login: string;
}
export declare function newUser(payload: SignUpRequest): Promise<IToken>;
export interface IChangePassword {
    currentPassword: string;
    newPassword: string;
}
export declare function changePassword(payload: IChangePassword): Promise<void>;

export declare function getCurrentToken(): string | undefined;
export declare function getCurrentUser(): User | undefined;
export declare function logout(): Promise<void>;
export interface Login {
    login: string;
    password: string;
}
export interface Token {
    token: string;
}
export declare function login(payload: Login): Promise<Token>;
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
export declare function newUser(payload: SignUpRequest): Promise<Token>;
export interface ChangePassword {
    currentPassword: string;
    newPassword: string;
}
export declare function changePassword(payload: ChangePassword): Promise<void>;

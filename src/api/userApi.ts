import axios, { AxiosError } from "axios";
import { environment } from "mascotas_react_common";
import { cleanupStore, updateStoreToken, updateStoreUser } from "mascotas_react_store";

axios.defaults.headers.common["Content-Type"] = "application/json";

export function getCurrentToken(): string | undefined {
    const result = localStorage.getItem("token");
    return result ? result : undefined;
}

function setCurrentToken(token: string) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = "bearer " + token;
}

export function getCurrentUser(): User | undefined {
    return (localStorage.getItem("user") as unknown) as User;
}

export async function logout(): Promise<void> {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    try {
        await axios.get(environment.backendUrl + "/v1/user/signout");
        axios.defaults.headers.common.Authorization = "";
        return Promise.resolve();
    } catch (err) {
        return Promise.resolve();
    } finally {
        cleanupStore()
    }
}

export interface Login {
    login: string;
    password: string;
}

export interface Token {
    token: string;
}

export async function login(payload: Login): Promise<Token> {
    try {
        const res = await axios.post(environment.backendUrl + "/v1/user/signin", payload);
        updateStoreToken(res.data.token)
        setCurrentToken(res.data.token);
        reloadCurrentUser().then();
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export interface User {
    id: string;
    name: string;
    login: string;
    permissions: string[];
}

export async function reloadCurrentUser(): Promise<User> {
    try {
        const res = await axios.get(environment.backendUrl + "/v1/users/current");
        localStorage.setItem("user", res.data);
        updateStoreUser(res.data);
        return Promise.resolve(res.data);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export interface SignUpRequest {
    name: string;
    password: string;
    login: string;
}

export async function newUser(payload: SignUpRequest): Promise<Token> {
    try {
        const res = await axios.post(environment.backendUrl + "/v1/user", payload);
        updateStoreToken(res.data.token)
        setCurrentToken(res.data.token);
        reloadCurrentUser().then();
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export interface ChangePassword {
    currentPassword: string;
    newPassword: string;
}

export async function changePassword(payload: ChangePassword): Promise<void> {
    try {
        const res = await axios.post(environment.backendUrl + "/v1/user/password", payload);
        return Promise.resolve(res.data);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

if (getCurrentToken()) {
    axios.defaults.headers.common.Authorization = "bearer " + getCurrentToken();
}

/**
 * Si existen los tokens en la db del browser, inicializar el store
 */
if (getCurrentToken() !== undefined) {
    const currentToken = getCurrentToken()
    const currentUser = getCurrentUser()
    if (currentToken !== undefined && currentUser !== undefined) {
        updateStoreToken(currentToken)
        updateStoreUser(currentUser)
        reloadCurrentUser().then();
    }
}
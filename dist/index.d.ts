import * as ApiModule from "./api/userApi";
import { changePassword, getCurrentToken, getCurrentUser, login, newUser, reloadCurrentUser } from "./api/userApi";
export { getCurrentToken, getCurrentUser, login, newUser, changePassword, reloadCurrentUser };
export declare type Login = ApiModule.Login;
export declare type Token = ApiModule.IToken;
export declare type User = ApiModule.User;
export declare type SignUpRequest = ApiModule.SignUpRequest;
export declare type ChangePassword = ApiModule.IChangePassword;

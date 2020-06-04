import * as ApiModule from "./api/userApi"
import { changePassword, getCurrentToken, getCurrentUser, login, newUser, reloadCurrentUser } from "./api/userApi"

export {
    getCurrentToken, getCurrentUser, login, newUser, changePassword, reloadCurrentUser
}

export type Login = ApiModule.Login
export type Token = ApiModule.IToken
export type User = ApiModule.User
export type SignUpRequest = ApiModule.SignUpRequest
export type ChangePassword = ApiModule.IChangePassword


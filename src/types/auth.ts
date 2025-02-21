import {JSX} from "react";

export interface LoginResponse {
    user: UserInfoDto
}

export interface UserInfoDto {
    email: string
    token: string
    username: string
    __v: number
    _id: string
}

export interface ProtectedRouteProps {
    children: JSX.Element;
}

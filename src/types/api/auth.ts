// LOGIN 
export interface LoginRequest {
    login: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    user: UserDTO;
}

export interface UserAccessPermisionDTO {
    resource: string;
    path: string;
    premissions: string[];
}

export interface UserDTO {
    userid: number;
    login: string;
    nam1: string;
    nam2: string;
    access: UserAccessPermisionDTO[];
}
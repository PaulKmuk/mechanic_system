import { apiRequest } from "./httpClient";
import type { ApiResponse } from "@/types/api/common";
import type { LoginRequest, LoginResponse } from "@/types/api/auth";

export async function login(
    payload: LoginRequest
): Promise<LoginResponse> {
    // apiRequest zwraca ApiResponse<LoginRespone>
    const apiResp: ApiResponse<LoginResponse> = 
        await apiRequest<LoginResponse>("/auth/login", {
            method: "POST",
            body: payload,
        });
    
    // jeśli status = "ERROR"
    if(apiResp.status === "ERROR" || !apiResp.data) {
        const msg = apiResp.error?.message ?? "Login failed";
        throw new Error(msg);
    }        

    // Zwaracamy już czyst LoginResponse 
    return apiResp.data;
}

export async function logout(): Promise<void> {
    const apiResp: ApiResponse<null> = 
        await apiRequest<null>("/auth/logout", {
            method: "POST",
        });
    
    if(apiResp.status === "ERROR") {
        console.warn("Logout error: ", apiResp.error)
    }
}
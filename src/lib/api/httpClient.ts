import { API_BASE_URL } from "@/config/api";
import type { ApiResponse } from "@/types/api/common";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {       //  Opcje do wysąłnia request
    method?: HttpMethod;         //  Metoda
    body?: unknown;              //  Body 
}

/**
 * Uniwersalna metoda do odpytania backend
 */
export async function apiRequest<T>(
    path: string,
    options: RequestOptions = {}
): Promise<ApiResponse<T>> {
    const { method = "GET", body } = options;

    // Wywołanie fetch - zapyatnie do backend
    const respons = await fetch(`${API_BASE_URL}${path}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
        credentials: "include",
    });
    
    const json = await respons.json();

    return json as ApiResponse<T>;
}
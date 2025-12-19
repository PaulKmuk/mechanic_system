import { apiRequest } from "./httpClient";
import type { ApiResponse } from "@/types/api/common";
import { ClientsResponse } from "@/types/api/clients";

export function getClients(params: {
    accessToken: string | null;
    page?: number;
    size?: number;
    search?: string
}) : Promise<ApiResponse<ClientsResponse>> {
    return apiRequest<ClientsResponse>("/clients", {
        accessToken: params.accessToken,
        method: "GET",
        query: {
            page: params.page ?? 0,
            size: params.size ?? 10,
            search: params.search ?? "",
        }
    });
}
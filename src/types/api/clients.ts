import { Pagination } from "./common"

// CLIENTS
export interface ClientsResponse {
    pagination: Pagination;
    clients: ClientsListItemDTO[]; 
}

export interface ClientsListItemDTO {
    clntid: number;
    clnam1: string;
    clnam2: string;
    phone: string;
    insstmp: string;
} 
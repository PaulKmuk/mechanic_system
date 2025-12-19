// Status odpowiedzi - respons ma zawsze nagłówek: "OK" | "ERROR"
export type ApiStatus = "OK" | "ERROR";

export interface ApiError {
    status: number;
    code: string;
    message: string;
    details: string;
}

export interface ApiResponse<T> {
    status: ApiStatus;
    data?: T;
    error?: ApiError;
}

export interface Pagination  {
    page: number;
    size: number;
    totalElements: number;
    totalPage: number;
}
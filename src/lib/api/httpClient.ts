import { API_BASE_URL } from "@/config/api";
import type { ApiResponse } from "@/types/api/common";
import path from "path";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RequestOptions {          //  Obiekt do wysyłania request
    method?: HttpMethod;            //  Metoda
    accessToken?: string | null;    //  Przekazany accessToken 
    body?: unknown;                 //  Body 
    query?: Record<string, string | number | boolean | null | undefined>;        //    Do przekazywania parametrów 
}

/**
 * Record<string, number>    - wytłumaczenie
 *  {
 *      [key: string]: number;
 *  }
 */



/**
 * Uniwersalna metoda do tworzenie endpoint z parametrami
 */
function buildURL(path: string, query?: RequestOptions["query"]) {
    const url = new URL(`${API_BASE_URL}${path}`);
    if(query) {
        Object.entries(query).forEach(([k,v]) => {
            if(v === null || v === undefined || v === "") return;
            url.searchParams.set(k, String(v));
        });
    }
    return url.toString();
}

/**
 * Uniwersalna metoda do odpytania backend
 */
export async function apiRequest<T>(
    path: string,
    options: RequestOptions = {}
): Promise<ApiResponse<T>> {
    // Dodanie parametrów - jeśli zostały podane;
    const url = buildURL(path, options.query);

    // Wywołanie fetch - zapyatnie do backend
    // const respons = await fetch(`${API_BASE_URL}${path}`, {
    const respons = await fetch(url, {        
        method: options.method,
        headers: {
          "Content-Type": "application/json",
          ...(options.accessToken ? {Authorization: `Bearer ${options.accessToken}`} : {}),
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        // dołączamy credentials - tam jest trzymany refresh_token
        credentials: "include",
    });
    
    const json = await respons.json();

    return json as ApiResponse<T>;
}
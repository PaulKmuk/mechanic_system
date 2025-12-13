"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { UserDTO } from "@/types/api/auth";
import { login as apiLogin, logout as apiLogout } from "@/lib/api/authApi";

// obiekt/typ udostępniany w całej aplikacji po zalogowaniu 
type AuthContextValue = {
    accessToken: string | null;   
    user: UserDTO | null;
    isLoading: boolean;               //  łądowniae na start (np. odczyt z localstorage)
    login: (login: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Klucz w localstorage (żeby nie zgubić tokena po refreshu strony) 
const ACCESS_TOKEN_KEY = "ms_accessToken";
const USER_KEY = "ms_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        const savedUser = localStorage.getItem(USER_KEY);

        if (savedToken) setAccessToken(savedToken);
        if (savedUser) setUser(JSON.parse(savedUser));

        setIsLoading(false);
    }, []);

    // Funkcja do logowania - zapytanie do backend 
    async function loginFn(login: string, password: string) {
        // wywołanie funcji API

        const data = await apiLogin({ login, password });

        //zapisanie w stanie (pamięć)
        setAccessToken(data.accessToken);
        setUser(data.user);

        // zapis w localStorage 
        localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }

    // Funkcja logout 
    async function logoutFn() {
        await apiLogout();

        // czyścimy stany 
        setAccessToken(null);
        setUser(null);

        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                user,
                isLoading,
                login: loginFn,
                logout: logoutFn,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

//  Hook do używania w komponentach
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth() must be used inside <AuthPrivider>")
    }
}
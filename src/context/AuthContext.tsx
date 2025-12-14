"use client";

import React, { cache, createContext, use, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { UserDTO } from "@/types/api/auth";
import { login as apiLogin, logout as apiLogout, refresh as apiRefresh } from "@/lib/api/authApi";

// obiekt/typ udostępniany w całej aplikacji po zalogowaniu 
type AuthContextValue = {
    accessToken: string | null;   
    user: UserDTO | null;
    isLoading: boolean;               

    login: (login: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    //  -------------------------------
    //  ------------ LOGIN ------------
    //  ------------------------------- 
    async function loginFn(login: string, password: string) {
        const data = await apiLogin({ login, password });
        setAccessToken(data.accessToken);
        setUser(data.user);
    }

    //  -------------------------------
    //  ----------- REFRESH -----------
    //  ------------------------------- 
    async function refreshSession() {
        const data = await apiRefresh();
        setAccessToken(data.accessToken);
        setUser(data.user);
    }
    
    //  -------------------------------
    //  ----------- LOGOUT ------------
    //  ------------------------------- 
    async function logoutFn() {
        try {
            await apiLogout();
        } finally {
            setAccessToken(null);
            setUser(null)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                await refreshSession();
            } catch {
                setAccessToken(null);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({ 
            accessToken, 
            user, 
            isLoading, 
            login: loginFn, 
            logout: logoutFn, 
            refreshSession 
        }),
        [accessToken, user, isLoading]
    );

    return (
        <AuthContext.Provider
            value={value}
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
    return ctx;
}
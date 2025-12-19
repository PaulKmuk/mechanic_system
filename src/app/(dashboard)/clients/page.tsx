'use client';

import React from 'react'
import { useEffect, useState } from 'react';
import { getClients } from '@/lib/api/clientsApi';
import { useAuth } from '@/context/AuthContext';

const Clients = () => {
    const { accessToken } = useAuth();

    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [clients, setClients] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!accessToken) return;
        console.log(accessToken);

        let cancelled = false;
        
        async function load() {
            setLoading(true);
            setErrorMsg(null);

            try {
                const response = await getClients({ accessToken, page, size, search });
                if (cancelled) return;
                if (response.status === "ERROR" || !response.data) {
                    setErrorMsg(response.error?.message ?? "Błąd podczas pobrania danych");
                    setClients([]);
                    console.log(response.error);
                    return;
                }
                setClients(response.data.clients);
                console.log(response.data);
            } catch (error) {
                if (!cancelled) setErrorMsg("Błąd podczas pobierania danych");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();

        return () => {
            cancelled = true;
        }
    }, [accessToken, page, size, search])

    return (
        <div className='h-screen flex justify-center items-center'>
            Clients
        </div>
    )
}

export default Clients
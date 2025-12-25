'use client';

import React from 'react'
import { useEffect, useState } from 'react';
import { getClients } from '@/lib/api/clientsApi';
import { useAuth } from '@/context/AuthContext';
import { ClientsListItemDTO } from '@/types/api/clients';

// Icons
import { Search } from 'lucide-react';
import HeaderPage from '@/components/dashboard/page/HeaderPage';
import SearchFilterPage from '@/components/dashboard/page/SearchFilterPage';

const Clients = () => {
    const { accessToken } = useAuth();

    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [clients, setClients] = useState<ClientsListItemDTO[]>([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [search, setSearch] = useState("");

    let countList = 1;

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
                setTotalPage(response.data.pagination.totalPage);
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
        <div className='h-screen flex flex-col justify-start items-start p-4'>

            {/* HEADER  */}
            <HeaderPage 
                items={["Lista Klientów"]}/>

            {/* SEARCH  */}
            <SearchFilterPage />

            {/* TABLE  */}
            <div className='w-full my-2 rounded-md border-1 border-gray-300 overflow-x-scroll no-scrollbar'>
                <table className="table-auto min-w-xl w-full">
                    <thead className='border-b-1 text-sm text-gray-600 border-gray-300 bg-blue-50'>
                        <tr>
                            <th className='text-center p-2'>Nr</th>
                            <th className='text-start p-2'>Imię i nazwisko</th>
                            <th className='text-center p-2'>Nr klienta</th>
                            <th className='text-center p-2'>Telefon</th>                            
                            <th className='text-center'>Data utworzenia</th>
                            <th className='text-center'>Akcja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, index) => (
                            <tr 
                                key={client.clntid}
                                className='border-b-1 border-gray-300 cursor-pointer hover:bg-yellow-50'
                            >
                                <td className='text-xs p-2 font-semibold text-gray-500 text-center'>
                                    {page * size + index + 1}
                                </td>                                 
                                <td className='text-xs p-2 font-semibold text-gray-800'>
                                    {client.clnam1 || client.clnam2 
                                        ? `${client.clnam1 ?? ""} ${client.clnam2 ?? ""}`.trim()
                                        : "-"}
                                </td>
                                <td className='text-xs p-2 font-semibold text-gray-500 text-center'>
                                    {client.clntid}
                                </td>
                                <td className='text-xs p-2 font-semibold text-gray-500 text-center'>
                                    {`+48 ${client.phone}`}
                                </td>                            
                                <td className='text-xs p-2 font-semibold text-gray-500 text-center'>
                                    {client.insstmp
                                        ? new Date(client.insstmp).toLocaleDateString("pl-PL")
                                        : "-"}
                                </td> 
                                <td className='text-xs p-2 font-semibold text-gray-500 text-center'>
                                    przyciski
                                </td>             
                            </tr>                            
                        ))}
                    </tbody>
                </table>             
                {/* PAGINATION  */}
                <div className='flex justify-end bg-blue-50 gap-2 text-xs py-2 px-4'>
                    <button>Poprzednia</button>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                    <button>Nastęna</button>
                    <div className="flex items-center gap-2">
                    <select
                        value={size}
                        onChange={(e) => {
                            setSize(Number(e.target.value));
                            setPage(0); // ważne: zmiana size resetuje stronę
                        }}
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </select>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Clients
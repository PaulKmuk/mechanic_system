'use client';

import React, { useEffect } from 'react'
import Navigation from "@/components/dashboard/navigation/Navigation";
import Footer from "@/components/dashboard/footer/Footer";
import Navbar from "@/components/dashboard/navbar/Navbar";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const MainLayout = ({ children }: { children: React.ReactNode }) => {

    const { user, isLoading } = useAuth();
    const route = useRouter();

    useEffect(() => {
        // czekamy az provider ustali stan (refresh / brak refresh)
        if (isLoading) return;

        if (!user) {
            route.replace("/login");
        }
    },[user, isLoading, route]);

    if(isLoading || !user) {
        return null;
    }

    return (
        <main className="flex justify-center w-screen">
            <div className="w-6xl h-full flex flex-col overflow-hidden">
                <Navbar />        
                <Navigation />        
                {children}        
                <Footer />
            </div>
        </main>
    )
}

export default MainLayout
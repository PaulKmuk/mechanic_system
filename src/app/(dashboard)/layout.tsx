import React from 'react'
import Navigation from "@/components/dashboard/navigation/Navigation";
import Footer from "@/components/dashboard/footer/Footer";
import Navbar from "@/components/dashboard/navbar/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
    <main className="flex justify-center w-screen h-screen">
        <div className="w-6xl h-full flex flex-col">
            <Navbar />        
            <Navigation />        
            {children}        
            <Footer />
        </div>
    </main>
    )
}

export default MainLayout
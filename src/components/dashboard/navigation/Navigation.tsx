'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { CalendarDays, Users, ListOrdered, CarFront, ChartColumnBig } from 'lucide-react';

const Navigation = () => {

    const navList = [
        {
            id: 1,
            label: "Kalendarz",
            path: "/",
            icon: CalendarDays,
            action: () => {}  
        },
        {
            id: 2,
            label: "Klienci",
            path: "/clients",
            icon: Users,
            action: () => {}  
        },
        {
            id: 3,
            label: "Zlecenia",
            path: "/commissions",
            icon: ListOrdered,
            action: () => {}  
        }, 
        {
            id: 4,
            label: "Samochody",
            path: "/cars",
            icon: CarFront,
            action: () => {}  
        }, 
        {
            id: 5,
            label: "Raporty",
            path: "/reports",
            icon: ChartColumnBig,
            action: () => {}  
        }, 
        {
            id: 6,
            label: "TEST",
            path: "/test",
            icon: ChartColumnBig,
            action: () => {}  
        },                       
    ]



    const [activeBtn, setActiveBtn] = useState("Kalendarz");

    return (
        <div className='navList'>
            {navList.map(navBtn => (
                <Link
                    href={navBtn.path} 
                    key={navBtn.id}            
                    className={navBtn.label == activeBtn ? 'navBtnActive group' : 'navBtn group'}                                
                    onClick={() => {
                        setActiveBtn(navBtn.label)
                    }}
                >
                    <div className='navBtnIcon'>
                        <navBtn.icon                             
                            size={14}
                        />                    
                    </div>
                    <p>
                        {navBtn.label}
                    </p>
                </Link>                
            ))}
        </div>
    )
}

export default Navigation
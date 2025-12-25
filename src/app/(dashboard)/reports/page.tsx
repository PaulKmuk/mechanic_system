import HeaderPage from '@/components/dashboard/page/HeaderPage'
import React from 'react'


const Reports = () => {
    return (
        <div className='h-full flex justify-center items-center'>
            {/* HEADER  */}
            <HeaderPage 
                items={["Raporty"]}/>
        </div>
    )
}

export default Reports
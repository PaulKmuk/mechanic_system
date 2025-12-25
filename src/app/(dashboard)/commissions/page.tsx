import HeaderPage from '@/components/dashboard/page/HeaderPage'
import React from 'react'

const Commissions = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            {/* HEADER  */}
            <HeaderPage 
                items={["Lista Zleceń"]}/>
        </div>
    )
}

export default Commissions
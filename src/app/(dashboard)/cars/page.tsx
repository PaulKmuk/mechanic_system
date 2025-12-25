import HeaderPage from '@/components/dashboard/page/HeaderPage'
import React from 'react'

const Cars = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            {/* HEADER  */}
            <HeaderPage 
                items={["Lista Samochodów"]}/>
        </div>
    )
}

export default Cars
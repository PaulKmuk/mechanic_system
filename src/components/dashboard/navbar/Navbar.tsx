import React from 'react'
import { Car, Search } from 'lucide-react';

const Navbar = () => {
    return (
        <div className='flex justify-between w-full px-2 md:px-4 py-2 border-b-1 md:border-b-1 border-gray-500'>
            <div className='flex items-center gap-2'>                
                <Car strokeWidth={2.50} className='text-blue-600'/>
                <div className='h-full flex flex-col justify-center pt-0.5 '>
                    <p className='leading-4 text-sm md:text-base font-extrabold'>Mechanic</p>
                    <p className='leading-4 text-xs italic'>System</p>
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <div className='flex items-center border-1 rounded-md md:gap-2 gap-1 md:px-2 px-1 py-1 w-40 md:w-full border-gray-400'>
                    <Search size={16}/>  
                    <input 
                        className='text-sm w-full focus:outline-none'
                        placeholder='Szukaj...'/>
                </div>
                <div className='md:flex flex-col hidden'>                    
                    <p className='font-bold'>
                        John
                    </p>
                    <p className='text-xs leading-1 font-extralight text-teal-600'>
                        Administrator
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Navbar
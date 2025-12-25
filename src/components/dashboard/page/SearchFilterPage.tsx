'use client'

import { Search } from 'lucide-react';

function SearchFilterPage() {
    return ( 
        <div className='py-2 w-full flex flex-col'> 
            <div className='flex'>
                <div className='flex-1'>
                    <div className='flex items-center border-1 rounded-md md:gap-2 gap-1 md:px-2 px-1 py-1 md:w-2/3 w-full border-gray-300'>
                        <Search size={16}/>  
                        <input 
                            className='text-sm w-full focus:outline-none'
                            placeholder='Szukaj...'/>
                    </div>
                </div>
                <div className='flex-1 flex justify-end'>
                    <button className='bg-blue-500 text-gray-100 py-2 px-5 text-xs rounded-lg cursor-pointer hover:bg-blue-400'>
                        Szukaj
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SearchFilterPage;
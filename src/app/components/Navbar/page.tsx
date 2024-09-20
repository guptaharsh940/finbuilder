'use client'
import React from 'react'
import Image from 'next/image';
import finbuilderlogo from '../../../../public/finbuilder logo.png'
// import Router from 'next/router';
import { useRouter,usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <div className='min-w-11 border-b-2 border-gray-500 border-opacity-30 flex justify-center items-center'>
            <div className='flex items-center justify-center mr-auto px-3 my-3' onClick={()=>(router.push("/"))}>
            <Image alt="logo" src={finbuilderlogo} width={50}/>
            <p className=' font-extrabold font-sans text-2xl ml-2' style={{ userSelect: 'none' }}>FinBuilder</p>
            </div>
            <div>
            <Button 
                    variant="link" 
                    className={`${pathname === '/' ? 'font-bold' : 'font-normal'}`} // Conditionally apply font-bold
                    onClick={() => router.push("/")}
                >
                    Dashboard
                </Button>
                <Button 
                    variant="link" 
                    className={`${pathname === '/yourdata' ? 'font-bold' : 'font-normal'}`} // Conditionally apply font-bold
                    onClick={() => router.push("/yourdata")}
                >
                    Data
                </Button>
            </div>
        </div>
    )
}

export default Navbar
'use client'
import Image from 'next/image'
import {useSession} from "next-auth/react";
import {usePathname} from "next/navigation";

const Header = () => {
    const {data: session} = useSession()
    const pathName = usePathname()
    const isGamePage = pathName.startsWith('/game')

    return  session && !isGamePage && (
        <header className="flex justify-between items-center p-4 bg-[#1E2329]">
            <div className="flex items-center">
                <Image src="/binance-logo.svg" alt="Binance" width={120} height={32}/>
            </div>

            <div className="flex items-center gap-4">
                <button className="bg-[#FCD535] text-black px-4 py-2 rounded">
                    Nạp
                </button>
                <button className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                </button>
                <button className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                    </svg>
                </button>
            </div>
        </header>
    )
}

export default Header

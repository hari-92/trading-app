'use client'
import {useEffect} from 'react'

interface TokenModalProps {
    token: any
    onClose: () => void
}

const TokenModal = ({token, onClose}: TokenModalProps) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="bg-[#1E2329] max-w-lg mx-auto mt-20 rounded-lg">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                        <span>{token.symbol}</span>
                    </div>
                    <button onClick={onClose} className="text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Số lượng</span>
                            <div>
                                <div>{token.balance}</div>
                                <div className="text-gray-400 text-right">≈ ${token.value}</div>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-400">Khả dụng</span>
                            <span>{token.balance}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-400">Đang rút</span>
                            <span>0.00</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-400">Lệnh Giao ngày</span>
                            <span>0.00</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-400">Lệnh chuyển đổi</span>
                            <span>0.00</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-400">Đã đóng băng</span>
                            <span>0.00</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400">PNL hôm nay</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                                </svg>
                            </div>
                            <span className="text-red-500">-1.59 USD(-1.51%)</span>
                        </div>
                    </div>

                    {/* Market Info */}
                    <div className="mt-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Giao ngay</span>
                            <div className="text-right">
                                <div>{token.symbol}/USDT 233.30</div>
                                <div className="text-red-500">-2.00%</div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Earn</span>
                            <div className="text-right">
                                <div>{token.symbol} APR lên tới</div>
                                <div className="text-green-500">145.24%</div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 grid grid-cols-3 gap-4">
                        <button className="bg-[#474D57] p-2 rounded text-center">Chuyển đổi</button>
                        <button className="bg-[#474D57] p-2 rounded text-center">Giao dịch</button>
                        <button className="bg-[#474D57] p-2 rounded text-center">Earn</button>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        <button className="bg-[#474D57] p-2 rounded text-center">Mua</button>
                        <button className="bg-[#474D57] p-2 rounded text-center">Bán</button>
                        <button className="bg-[#474D57] p-2 rounded text-center">Nạp</button>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <button className="bg-[#474D57] p-2 rounded text-center">Rút</button>
                        <button className="bg-[#474D57] p-2 rounded text-center">Chuyển tiền</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TokenModal

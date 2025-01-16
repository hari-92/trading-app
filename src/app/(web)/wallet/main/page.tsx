'use client'
import {useState} from 'react'
import TokenModal from "@/components/modal/token/TokenModal";

interface Token {
    symbol: string;
    name: string;
    balance: number;
    value: number;
}

const WalletMainPage = () => {
    const [balance] = useState({
        btc: 0.00206333,
        usd: 203.82
    })
    const [selectedToken, setSelectedToken] = useState<Token | null>(null)

    const assets = [
        {
            symbol: 'SOL',
            name: 'Solana',
            balance: 0.442,
            value: 103.14
        },
        {
            symbol: 'USDT',
            name: 'TetherUS',
            balance: 100.2707694,
            value: 100.23
        }
    ]

    return (
        <div className="bg-[#1E2329] min-h-screen text-white p-4">
            <div className="mb-6">
                <h2 className="text-lg mb-4">Giao ngày</h2>
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span>Số dư ước tính</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                        </svg>
                    </div>
                    <div className="text-2xl mb-1">{balance.btc} BTC</div>
                    <div className="text-gray-400">≈ {balance.usd} USD</div>
                </div>

                <div className="flex gap-4 mb-6">
                    <button className="bg-[#474D57] px-6 py-2 rounded">Nạp</button>
                    <button className="bg-[#474D57] px-6 py-2 rounded">Rút</button>
                    <button className="bg-[#474D57] px-6 py-2 rounded">Chuyển</button>
                </div>
            </div>

            <div>
                <h2 className="text-lg mb-4">Giao ngày</h2>
                <div className="flex items-center gap-2 mb-4">
                    <input type="checkbox"/>
                    <span>Ẩn tài sản {'<'} 1 USD</span>
                </div>

                {assets.map((asset, index) => (
                    <div key={index} className="flex justify-between items-center py-4 border-b border-gray-700"
                         onClick={() => setSelectedToken(asset)}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                            <div>
                                <div>{asset.symbol}</div>
                                <div className="text-gray-400 text-sm">{asset.name}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div>{asset.balance}</div>
                            <div className="text-gray-400">${asset.value}</div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedToken && (
                <TokenModal
                    token={selectedToken}
                    onClose={() => setSelectedToken(null)}
                />
            )}
        </div>
    )
}

export default WalletMainPage

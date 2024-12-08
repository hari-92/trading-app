'use client'

import {ChangeEvent, FC, FormEvent, useState} from 'react'
import {FcGoogle} from "react-icons/fc"
import {FaApple} from "react-icons/fa"
import Image from 'next/image'

interface LoginFormProps {
    onSubmit?: (email: string) => void
    onGoogleSignIn?: () => void
    onAppleSignIn?: () => void
}

export const LoginForm: FC<LoginFormProps> = ({
                                                  onSubmit,
                                                  onGoogleSignIn,
                                                  onAppleSignIn
                                              }) => {
    const [email, setEmail] = useState<string>('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        onSubmit?.(email)
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
    }

    return (
        <div className="min-h-screen bg-[#0B0E11] p-6">
            {/* Logo */}
            <div className="mb-8">
                <Image
                    src="/binance-logo.svg" // Thêm logo Binance vào thư mục public
                    alt="Binance Logo"
                    width={120}
                    height={30}
                />
            </div>

            {/* Form Container */}
            <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-white mb-6">
                    Đăng nhập
                </h1>

                <div className="space-y-6">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">
                                Email/Số điện thoại
                            </label>
                            <input
                                type="text"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Email/Số điện thoại (không có mã quốc gia)"
                                className="w-full bg-[#1E2329] text-white px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500"
                            />
                        </div>

                        {/* Continue Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#FCD535] text-black py-3 rounded font-medium hover:bg-[#F0B90B] transition-colors"
                        >
                            Tiếp theo
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[#0B0E11] text-gray-500">
                                hoặc
                            </span>
                        </div>
                    </div>

                    {/* Social Buttons */}
                    <div className="space-y-4">
                        <button
                            onClick={onGoogleSignIn}
                            className="w-full flex items-center justify-center space-x-2 bg-[#1E2329] text-white py-3 rounded hover:bg-[#2B3139] transition-colors"
                        >
                            <FcGoogle className="w-5 h-5"/>
                            <span>Tiếp tục với Google</span>
                        </button>

                        <button
                            onClick={onAppleSignIn}
                            className="w-full flex items-center justify-center space-x-2 bg-[#1E2329] text-white py-3 rounded hover:bg-[#2B3139] transition-colors"
                        >
                            <FaApple className="w-5 h-5"/>
                            <span>Tiếp tục với Apple</span>
                        </button>
                    </div>

                    {/* Register Link */}
                    <div className="text-center">
                        <a
                            href="/register"
                            className="text-[#F0B90B] hover:text-yellow-400"
                        >
                            Tạo tài khoản Binance
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm

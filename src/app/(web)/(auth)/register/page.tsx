'use client'

import RegisterForm from "@/components/auth/register/RegisterForm"

const RegisterPage = () => {
    return (
        <RegisterForm
            onSubmit={(email) => {
                console.log(email)
            }}
        />
    )
}

export default RegisterPage
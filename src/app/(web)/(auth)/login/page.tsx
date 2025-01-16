'use client'
import LoginForm from "@/components/auth/login/LoginForm";
import {signIn, useSession} from "next-auth/react";

const LoginPage = () => {
    const { data: session } = useSession();
    if (session) {
        console.log('have session:', session);
    }
    return (
        <LoginForm
            onSubmit={(email) => {
                // Xử lý submit form
                console.log(email)
            }}
            onGoogleSignIn={() => {
                // Xử lý đăng nhập Google

                signIn("google")
            }}
            onAppleSignIn={() => {
                // Xử lý đăng nhập Apple
            }}
        />
    );
};
export default LoginPage
'use client'
import LoginForm from "@/components/auth/login/LoginForm";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from 'next/navigation';
import {useEffect} from "react";
import AuthService from "@/services/auth.service";

const LoginPage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
        console.log(session)
        const handleGoogleAuth = async () => {
            if (session?.user) {
                try {
                    const response = await AuthService.loginWithGoogle({
                        token: session.user as string,
                        email: session.user.email!,
                        name: session.user.name!,
                    });
                    console.log(response);
                    // Lưu token
                    localStorage.setItem('token', response.token);

                } catch (error) {
                    console.error(error);
                }
            }
        };

        handleGoogleAuth();
    }, [session, router]);
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
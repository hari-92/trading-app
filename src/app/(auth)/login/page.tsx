'use client'
import LoginForm from "@/components/auth/login/LoginForm";

const LoginPage = () => {
    return (
        <LoginForm
            onSubmit={(email) => {
                // Xử lý submit form
                console.log(email)
            }}
            onGoogleSignIn={() => {
                // Xử lý đăng nhập Google
            }}
            onAppleSignIn={() => {
                // Xử lý đăng nhập Apple
            }}
        />
    );
};
export default LoginPage
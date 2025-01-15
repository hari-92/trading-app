import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import credentials from "../../../../../credentials.development.json"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: credentials.web.client_id,
            clientSecret: credentials.web.client_secret,
        })
    ],
    callbacks: {
        async session({ session }) {
            return session
        },
        async jwt({ token }) {
            return token
        }
    }
})

export { handler as GET, handler as POST };
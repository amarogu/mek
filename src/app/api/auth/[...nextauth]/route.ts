import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import 'dotenv/config';
import { AuthOptions } from 'next-auth';
import { connectDb } from '@/lib/connect';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials): Promise<any> {
                const { name, password } = credentials as { name: string, password: string };
                try {
                    const models = await connectDb();
                    if (models) {
                        const { User } = models;
                        const user = await User.findOne({ name });
                        if (!user || !user.password) {
                            return null;
                        }
                        const passwordsMatch = await bcrypt.compare(password, user.password);
                        if (!passwordsMatch) {
                            return null;
                        }
                        return user;
                    } else {
                        return null;
                    }
                } catch (err) {
                    console.log(err);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/admin/login'
    }
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
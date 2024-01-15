import { appwriteKey, authUrl, projectId } from "@utils/global";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
					placeholder: "jsmith@example.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const { email, password } = credentials;
				try {
					const reqAuth = await fetch(authUrl, {
						method: "POST",
						body: JSON.stringify({
							email,
							password,
						}),
						headers: {
							"Content-Type": "application/json",
							"X-Appwrite-Response-Format": "1.4.0",
							"X-Appwrite-Project": projectId,
							"X-Appwrite-Key": appwriteKey,
						},
					});
					const user = await reqAuth.json();
					return user;
				} catch (e) {
					return null;
				}
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log(user, account, profile, email, credentials);
			const isAllowedToSignIn = true;
			if (isAllowedToSignIn) return true;
			// Return false to display a default error message
			return false;
		},
		async redirect({ url, baseUrl }) {
			console.log(url, baseUrl);
			if (url.startsWith("/")) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
		async session({ session, token, user }) {
			console.log(session, token, user);
			session.accessToken = token.accessToken;
			return session;
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			console.log(token, user, account, profile, isNewUser);
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
	},
	secret: process.env.NEXT_AUTH_SECRET,
	logger: {
		error(code, ...message) {
			console.error(code, message);
		},
		warn(code, ...message) {
			console.warn(code, message);
		},
		debug(code, ...message) {
			console.debug(code, message);
		},
	},
	pages: {
		signIn: "/auth",
	},
});

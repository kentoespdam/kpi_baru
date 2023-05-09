import { REMOTE_EMPLOYEE } from "@interfaces/IEmployee";
import axios from "axios";
import { NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";

export const logoutUrl = process.env.KEYCLOAK_LOGOUT_URL;

const tokenIntrospect = async (accessToken: string): Promise<User> => {
	return axios
		.post(
			String(process.env.KEYCLOAK_TOKEN_INTROSPECT_URL),
			{
				token: accessToken,
				client_id: process.env.KEYCLOAK_CLIENT_ID,
				client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.log(error);
			return {};
		});
};
const tokenRefresh = async (token: JWT): Promise<JWT> => {
	return axios
		.post(
			String(process.env.KEYCLOAK_TOKEN_URL),
			{
				grant_type: "refresh_token",
				client_id: process.env.KEYCLOAK_CLIENT_ID,
				client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
				refresh_token: token.refreshToken,
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		)
		.then(async (response) => {
			// const user = await tokenIntrospect(response.data.access_token);
			const user = await getEmployee(response.data.access_token);
			token.expires = user.exp! * 1000;
			token.user = user;
			token.accessToken = response.data.access_token;
			token.refreshToken = response.data.refresh_token;
			token.idToken = response.data.id_token;
			token.isExpired = false;
			return token;
		})
		.catch((error) => {
			token.isExpired = true;
			console.log(error);
			return token;
		});
};

async function getEmployee(accessToken: string): Promise<User> {
	try {
		const user = await tokenIntrospect(accessToken);
		const employee = await axios.get(
			`${REMOTE_EMPLOYEE}/${user.username}/nipam`,
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		const result: User = {
			id: String(user.sub),
			exp: user.exp,
			username: user.username,
			realm_access: user.realm_access,
			resource_access: user.resource_access,
			session_state: user.session_state,
			sid: user.sid,
			client_id: user.client_id,
			active: user.active,
			employee: employee.data.data,
		};
		return result;
	} catch (e) {
		console.log(e);
		return {
			id: "",
		};
	}
}

export const nextOptions: NextAuthOptions = {
	secret: process.env.NEXT_AUTH_SECRET,
	providers: [
		{
			id: "keycloak",
			name: "Keycloak",
			type: "oauth",
			wellKnown: process.env.KEYCLOAK_WELL_KNOWN,
			clientId: process.env.KEYCLOAK_CLIENT_ID,
			clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
			profile: (profile) => {
				return {
					...profile,
					id: profile.sid,
				};
			},
		},
	],
	// debug: true,
	session: {
		strategy: "jwt",
		maxAge: 60 * 10, // 10 minutes
	},
	callbacks: {
		async jwt({ token, user, account }) {
			if (user) {
				token.accessToken = account?.access_token;
				token.refreshToken = account?.refresh_token;
				token.isExpired = false;
				return token;
			}
			return await tokenRefresh(token);
		},
		async session({ session, token }) {
			if (token) {
				session = {
					...session,
					user: token?.user,
					isExpired: token?.isExpired,
				};
			}
			return session;
		},
	},
};

export default NextAuth(nextOptions);

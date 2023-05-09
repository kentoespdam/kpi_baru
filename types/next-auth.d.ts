import { Awaitable, DefaultSession, DefaultUser, User } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import { AdapterUser } from "next-auth/adapters";
import { IEmployee } from "@interfaces/IEmployee";

declare module "next-auth/jwt" {
	interface JWT extends Record<string, unknown>, DefaultJWT {
		user?: User | AdapterUser;
		idToken?: string;
		accessToken?: string;
		refreshToken?: string;
		expires?: number;
		isExpired?: boolean;
	}
}

declare module "next-auth" {
	interface Session extends DefaultSession {
		user?: User | AdapterUser;
		accessToken?: string;
		refreshToken?: string;
		idToken?: string;
		isExpired?: boolean;
	}

	interface IRoles {
		[key: string]: string;
	}

	interface IRealmAccess {
		roles: IRoles;
	}

	interface IResourceAccess {
		account: {
			roles: IRoles;
		};
		"prototipe-kpi": {
			roles: IRoles;
		};
	}

	interface User extends DefaultUser {
		sub?: string;
		exp?: number;
		username?: string;
		realm_access?: IRealmAccess;
		resource_access?: IResourceAccess;
		session_state?: string;
		sid?: string;
		client_id?: string;
		active?: boolean;
		employee?: IEmployee;
	}

	interface Account extends Partial<TokenSet> {
		access_token: string;
	}
}

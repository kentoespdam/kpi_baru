"use client";
import { IChildrenProps } from "@commons/types";
import { Session } from "next-auth";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

const SessClientHandler = ({ children }: IChildrenProps) => {
	const session = useSession({
		required: true,
		onUnauthenticated() {
			signIn();
		},
	});
	if (session.status === "loading") return <div>Loading...</div>;
	if (session.data.isExpired) signOut();
	const user = session.data.user;

	return <>{children}</>;
};

type AuthContextProps = {
	session: Session | null;
} & IChildrenProps;

const AuthContext = ({ children, session }: AuthContextProps) => {
	return (
		<SessionProvider session={session} refetchInterval={280}>
			<SessClientHandler>{children}</SessClientHandler>
		</SessionProvider>
	);
};

export default AuthContext;

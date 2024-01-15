"use client";

import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Provide = ({ children }: { children: React.ReactNode }) => {
	const { data: session } = useSession();
	console.log(session);
	if (!session || session == null) redirect("/auth");
	return <>{children}</>;
};

const NextSession = ({
	session,
	children,
}: { session: Session | null; children: React.ReactNode }) => {
	return (
		<SessionProvider session={session}>
			<Provide>{children}</Provide>
		</SessionProvider>
	);
};

export default NextSession;

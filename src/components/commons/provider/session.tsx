"use client";

import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { redirect } from "next/navigation";
import { useSessionStore } from "src/store/main/session";

const getSession = async () => {
	try {
		const { status, data } = await axios.get("/api/auth/session");
		if (status !== 200) throw Error("Unauthorized");
		return data;
	} catch (e: any) {
		throw Error(JSON.stringify(e.message));
	}
};

const SessionChecker = () => {
	const { user, setUser } = useSessionStore();

	const { status, isError, data } = useQuery({
		queryKey: ["session-checker"],
		queryFn: getSession,
	});

	// console.log(status);
	if (isError) {
		setUser(null);
		redirect("/auth");
	}
	if (data && user === null) setUser(data);
	return null;
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchInterval: 60000,
			refetchOnWindowFocus: false,
		},
	},
});
const AppwriteSessionProvider = () => {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<SessionChecker />
			</QueryClientProvider>
		</>
	);
};

export default AppwriteSessionProvider;

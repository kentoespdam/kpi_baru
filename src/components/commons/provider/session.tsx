"use client";
import { useSessionStore } from "@store/main/session";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type SessionProviderProps = {
	isLogin: boolean;
};
const SessionProvider = (props: SessionProviderProps) => {
	const { isLogin } = props;
	const { user, setUser } = useSessionStore();

	const { status, data } = useQuery({
		queryKey: ["session"],
		queryFn: async () => {
			if (!user) {
				const { status, data } = await axios.get("/api/auth/session");
				if (status === 200) setUser(data);
				else setUser(null);
			}
			const { status, data } = await axios.options("/api/auth/token");
			return status;
		},
		enabled: !!isLogin,
		refetchInterval: 60 * 1000,
	});

	return null;
};

export default SessionProvider;

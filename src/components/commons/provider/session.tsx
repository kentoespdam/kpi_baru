"use client";
import { useSessionStore } from "@store/main/session";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SessionProvider = () => {
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
		refetchInterval: 60 * 1000,
	});

	return null;
};

export default SessionProvider;

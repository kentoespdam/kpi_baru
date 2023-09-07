"use client";
import { useSessionStore } from "@store/main/session";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";

const SessionProvider = () => {
	const { user, setUser } = useSessionStore();
	const path = usePathname();

	useQuery({
		queryKey: ["session"],
		queryFn: async () => {
			if (!user) {
				const { status, data } = await axios.get("/api/auth/session");
				if (status === 200) setUser(data);
				else setUser(null);
				return status;
			}
			const { status } = await axios.options("/api/auth/token");
			return status;
		},
		refetchInterval: 60 * 1000,
		cacheTime: Infinity,
		enabled: path !== "/auth",
	});

	return null;
};

export default SessionProvider;

"use client";
import { useSessionStore } from "@store/main/session";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";

const SessionProvider = () => {
	const { user, setUser } = useSessionStore();
	const path = usePathname();

	if (path === "/auth") return null;

	useQuery({
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
		cacheTime: Infinity,
	});

	return null;
};

export default SessionProvider;

"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type SessionProviderProps = {
	isLogin: boolean;
};
const SessionProvider = (props: SessionProviderProps) => {
	const { isLogin } = props;
	const { status, data } = useQuery({
		queryKey: ["session"],
		queryFn: async () => {
			const { status, data } = await axios.options("/api/auth/token");
			return status;
		},
		enabled: !!isLogin,
		refetchInterval: 60 * 1000,
	});

	return null;
};

export default SessionProvider;

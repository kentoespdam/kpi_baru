"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { sessionNames } from "src/lib";

type SessionProviderProps = {
	cookies: ReadonlyRequestCookies;
};
const SessionProvider = (props: SessionProviderProps) => {
	const { cookies } = props;
	const { status, data } = useQuery({
		queryKey: ["session"],
		queryFn: async () => {
			const { status, data } = await axios.options("/api/auth/token");
			return status;
		},
		enabled: !!cookies,
		refetchInterval: 60 * 1000,
	});

	return null;
};

export default SessionProvider;

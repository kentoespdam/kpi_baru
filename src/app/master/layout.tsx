import AppwriteSessionProvider from "@components/commons/provider/session";
import { ChildrenProps } from "@myTypes/index";
import { cookies } from "next/dist/client/components/headers";
import { sessionNames } from "src/lib";

const Layout = ({ children }: ChildrenProps) => {
	const cookie = cookies();
	return (
		<>
			{cookie.has(sessionNames[0]) || cookie.has(sessionNames[1]) ? (
				<AppwriteSessionProvider />
			) : null}
			{children}
		</>
	);
};

export default Layout;

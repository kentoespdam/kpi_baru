import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { IChildrenProps } from "@commons/types";
import ThemeContext from "@template/theme.context";
import AuthContext from "@template/auth.context";
import { getServerSession } from "next-auth/next";
import { nextOptions } from "@api/auth/[...nextauth]";
import TemplateComponent from "../components/template/index";

export async function getSession() {
	const session = await getServerSession(nextOptions);
	return session;
}

export default async function Layout({ children }: IChildrenProps) {
	const session = await getSession();
	return (
		<html lang="en">
			<head>
				{/* <title>My page</title> */}
				<meta
					name="viewport"
					content="initial-scale=1, width=device-width"
				/>
			</head>
			<body>
				<AuthContext session={session}>
					<ThemeContext>
						<TemplateComponent>{children}</TemplateComponent>
					</ThemeContext>
				</AuthContext>
			</body>
		</html>
	);
}

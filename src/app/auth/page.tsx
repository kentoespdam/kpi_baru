import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";
import dynamic from "next/dynamic";

const AuthComponent = dynamic(() => import("@components/auth"));

export const metadata = {
	title: "Login KPI",
};
const AuthPage = () => {
	return (
		<MuiContainer maxWidth="xs" sx={{ mt: 4 }}>
			<CardBuilder title={metadata.title} isLink={false} color="error">
				<AuthComponent />
			</CardBuilder>
		</MuiContainer>
	);
};

export default AuthPage;

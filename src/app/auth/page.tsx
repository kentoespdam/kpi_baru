import AuthComponent from "@components/auth";
import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";

export const metadata = {
	title: "Login KPI",
};
const AuthPage = () => {
	return (
		<MuiContainer maxWidth="xs" disableGutters>
			<CardBuilder title={metadata.title} isLink={false} color="error">
				<AuthComponent />
			</CardBuilder>
		</MuiContainer>
	);
};

export default AuthPage;

import Login from "@components/auth/login";
import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/mui/container";

export const metadata = {
	title: "Login KPI",
};
const Auth = async () => {
	return (
		<MuiContainer maxWidth="xs" sx={{ mt: 4 }}>
			<CardBuilder title={metadata.title} isLink={false} color="error">
				<Login />
			</CardBuilder>
		</MuiContainer>
	);
};

export default Auth;

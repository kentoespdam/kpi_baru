import ChangePasswordComponent from "@components/profile/password";
import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";

export const metadata = { title: "Change Password" };
const ChangePasswordPage = () => {
	return (
		<MuiContainer maxWidth="xs" sx={{ mt: 4 }}>
			<CardBuilder title={metadata.title} isLink={false} color="warning">
				<ChangePasswordComponent />
			</CardBuilder>
		</MuiContainer>
	);
};

export default ChangePasswordPage;

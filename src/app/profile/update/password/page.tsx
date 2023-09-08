import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@components/commons/mui/container"));
import CardBuilder from "@components/commons/card";
const ChangePasswordComponent = dynamic(
	() => import("@components/profile/password")
);

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

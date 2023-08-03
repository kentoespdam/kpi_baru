import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";
import ProfesiForm from "@components/master/profesi/form";

export const metadata = { title: "Add Master Profesi" };
const AddMasterProfesi = () => {
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="success">
				<ProfesiForm />
			</CardBuilder>
		</MuiContainer>
	);
};

export default AddMasterProfesi;

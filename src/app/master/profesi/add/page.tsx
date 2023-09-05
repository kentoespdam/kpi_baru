import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@mui/material/Container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const ProfesiForm = dynamic(() => import("@components/master/profesi/form"));

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

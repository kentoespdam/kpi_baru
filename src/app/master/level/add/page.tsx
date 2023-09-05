import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@mui/material/Container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const LevelForm = dynamic(() => import("@components/master/level/form"));

export const metadata = { title: "Add Master Level" };
const AddMasterLevel = () => {
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="success">
				<LevelForm />
			</CardBuilder>
		</MuiContainer>
	);
};

export default AddMasterLevel;

import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";
import LevelForm from "@components/master/level/form";

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

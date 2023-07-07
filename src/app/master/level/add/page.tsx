import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";

export const metadata = { title: "Add Master Level" };
const AddMasterLevel = () => {
	return (
		<MuiContainer maxWidth="sm">
			<CardBuilder title={metadata.title} isLink={false} color="success">
				Add
			</CardBuilder>
		</MuiContainer>
	);
};

export default AddMasterLevel;

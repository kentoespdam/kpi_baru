import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";

export const metadata = {
	title: "Edit Master Level",
};
const EditMasterLevel = ({ params }: { params: { id: number } }) => {
	const { id } = params;
	return (
		<MuiContainer maxWidth="sm">
			<CardBuilder title={metadata.title} isLink={false} color="warning">
				Edit Level {id}
			</CardBuilder>
		</MuiContainer>
	);
};
export default EditMasterLevel;

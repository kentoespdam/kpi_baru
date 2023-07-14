import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";
import LevelForm from "@components/master/level/form";

export const metadata = {
	title: "Edit Master Level",
};
const EditMasterLevel = ({ params }: { params: { id: number } }) => {
	const { id } = params;
	return (
		<MuiContainer maxWidth="sm">
			<CardBuilder title={metadata.title} isLink={false} color="warning">
				<LevelForm id={id} />
			</CardBuilder>
		</MuiContainer>
	);
};
export default EditMasterLevel;

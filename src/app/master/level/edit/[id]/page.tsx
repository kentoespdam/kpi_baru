import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@mui/material/Container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const LevelForm = dynamic(() => import("@components/master/level/form"));

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

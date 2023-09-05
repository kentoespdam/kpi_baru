import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@mui/material/Container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const ProfesiForm = dynamic(() => import("@components/master/profesi/form"));

export const metadata = { title: "Edit Master Profesi" };
const EditMasterProfesi = ({ params }: { params: { id: number } }) => {
	const { id } = params;
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="warning">
				<ProfesiForm id={id} />
			</CardBuilder>
		</MuiContainer>
	);
};

export default EditMasterProfesi;

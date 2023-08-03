import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";
import ProfesiForm from "@components/master/profesi/form";

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

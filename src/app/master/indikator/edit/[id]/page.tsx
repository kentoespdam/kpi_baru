import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";
import IndikatorFormComponent from "@components/master/indikator/form";

export const metadata = { title: "Edit Master Indikator" };
const EditMasterIndikator = ({ params }: { params: { id: number } }) => {
	const { id } = params;
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="success">
				<IndikatorFormComponent id={id} />
			</CardBuilder>
		</MuiContainer>
	);
};

export default EditMasterIndikator;

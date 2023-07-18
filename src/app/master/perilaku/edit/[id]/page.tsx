import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";
import PerilakuForm from "@components/master/perilaku/form";

export const metadata = { title: "Edit Master Perilaku" };
const EditMasterPerilaku = ({ params }: { params: { id: number } }) => {
	const { id } = params;
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="warning">
				<PerilakuForm id={id} />
			</CardBuilder>
		</MuiContainer>
	);
};

export default EditMasterPerilaku;

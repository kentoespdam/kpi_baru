import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";
import SatuanForm from "@components/master/satuan/form";

export const metadata = { title: "Edit Master Satuan" };
const EditMasterSatuan = ({ params }: { params: { id: number } }) => {
	const { id } = params;
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="warning">
				<SatuanForm id={id} />
			</CardBuilder>
		</MuiContainer>
	);
};

export default EditMasterSatuan;

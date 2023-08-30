import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";
import SatuanForm from "@components/master/satuan/form";

export const metadata = { title: "Add Master Satuan" };
const AddMasterSatuan = () => {
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="success">
				<SatuanForm />
			</CardBuilder>
		</MuiContainer>
	);
};

export default AddMasterSatuan;

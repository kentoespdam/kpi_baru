import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@mui/material/Container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const SatuanForm = dynamic(() => import("@components/master/satuan/form"));

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

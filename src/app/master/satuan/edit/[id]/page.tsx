import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@mui/material/Container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const SatuanForm = dynamic(() => import("@components/master/satuan/form"));

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

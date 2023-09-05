import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@components/commons/mui/container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const PerilakuForm = dynamic(() => import("@components/master/perilaku/form"));

export const metadata = { title: "Add Master Perilaku" };
const AddMasterPerilaku = () => {
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="success">
				<PerilakuForm />
			</CardBuilder>
		</MuiContainer>
	);
};

export default AddMasterPerilaku;

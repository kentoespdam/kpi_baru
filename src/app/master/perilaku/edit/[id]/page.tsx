import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@components/commons/mui/container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const PerilakuForm = dynamic(() => import("@components/master/perilaku/form"));

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

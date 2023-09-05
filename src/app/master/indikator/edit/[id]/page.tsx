import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@components/commons/mui/container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const IndikatorFormComponent = dynamic(
	() => import("@components/master/indikator/form")
);

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

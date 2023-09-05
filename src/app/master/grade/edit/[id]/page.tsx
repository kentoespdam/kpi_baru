import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@mui/material/Container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const GradeForm = dynamic(() => import("@components/master/grade/form"));

export const metadata = { title: "Add Master Grade" };

const GradeAdd = ({ params }: { params: { id: number } }) => {
	const { id } = params;
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="success">
				<GradeForm id={id} />
			</CardBuilder>
		</MuiContainer>
	);
};

export default GradeAdd;

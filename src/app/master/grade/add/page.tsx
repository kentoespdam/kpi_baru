import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@mui/material/Container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const GradeForm = dynamic(() => import("@components/master/grade/form"));

export const metadata = { title: "Add Master Grade" };

const GradeAdd = () => {
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="success">
				<GradeForm />
			</CardBuilder>
		</MuiContainer>
	);
};

export default GradeAdd;

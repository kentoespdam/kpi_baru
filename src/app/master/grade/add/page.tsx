import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";
import GradeForm from "@components/master/grade/form";

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

import CardBuilder from "@components/commons/card";
import GradeComponent from "@components/master/grade";

export const metadata = { title: "Master Grade" };
const MasterGrade = () => {
	return (
		<CardBuilder title={metadata.title} isLink={true}>
			<GradeComponent />
		</CardBuilder>
	);
};

export default MasterGrade;

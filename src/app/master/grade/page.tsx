import dynamic from "next/dynamic";

const CardBuilder = dynamic(() => import("@components/commons/card"));
const GradeComponent = dynamic(() => import("@components/master/grade"));

export const metadata = { title: "Master Grade" };
const MasterGrade = () => {
	return (
		<CardBuilder title={metadata.title} isLink={true}>
			<GradeComponent />
		</CardBuilder>
	);
};

export default MasterGrade;

import CardBuilder from "@components/commons/card";
import TransKpiFileListComponent from "@components/trans/kpi/staff/file";

export const metadata = { title: "List File" };
const FilePage = ({
	params,
}: {
	params: { indikatorId: number; uraianId: number };
}) => {
	const { indikatorId, uraianId } = params;

	return null;
	// return (
	// 	<CardBuilder title={metadata.title} isLink={false} color="success">
	// 		<TransKpiFileListComponent uraianId={uraianId} />
	// 	</CardBuilder>
	// );
};

export default FilePage;

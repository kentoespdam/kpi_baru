import dynamic from "next/dynamic";
const CardBuilder = dynamic(() => import("@components/commons/card"));
const TransKpiFileListComponent = dynamic(
	() => import("@components/trans/kpi/staff/file")
);

export const metadata = { title: "List File" };
const FilePage = ({
	params,
}: {
	params: { indikatorId: number; uraianId: number };
}) => {
	const { indikatorId, uraianId } = params;

	return (
		<CardBuilder title={metadata.title} isLink={false} color="success">
			<TransKpiFileListComponent uraianId={uraianId} />
		</CardBuilder>
	);
};

export default FilePage;

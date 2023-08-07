import CardBuilder from "@components/commons/card";
import TransKpiFileListComponent from "@components/trans/kpi/staff/file";
import { Suspense } from "react";

export const metadata = { title: "List File" };
const FilePage = ({
	params,
}: {
	params: { indikatorId: number; uraianId: number };
}) => {
	const { indikatorId, uraianId } = params;

	return (
		<Suspense fallback={<>Rendering Page...</>}>
			<CardBuilder title={metadata.title} isLink={false} color="success">
				<TransKpiFileListComponent uraianId={uraianId} />
			</CardBuilder>
		</Suspense>
	);
};

export default FilePage;

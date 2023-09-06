import { Uraian } from "@myTypes/entity/uraian";
import { useUraianStore } from "@store/filter/master/uraian";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const List = dynamic(() => import("@mui/material/List"));
const UraianListItem = dynamic(() => import("./item"));

const UraianList = () => {
	const {
		pageRequest,
		sortRequest,
		indikatorId,
		uraian,
		kpiId,
		profesiId,
		levelId,
		status,
	} = useUraianStore();

	const qc = useQueryClient();
	const data = qc.getQueryData([
		"master.uraian",
		{ pageRequest, sortRequest },
		{ indikatorId, uraian, kpiId, profesiId, levelId, status },
	]) satisfies Uraian[] | undefined;

	if (!data) return null;
	if (data.length === 0) return null;
	let urut = 1;

	return (
		<List sx={{ p: 0 }}>
			{data.map((item) => (
				<UraianListItem key={item.id} uraian={item} urut={urut++} />
			))}
		</List>
	);
};

export default UraianList;

import { SatuanWithPagination } from "@myTypes/entity/satuan";
import { useSatuanStore } from "@store/filter/master/satuan";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const CellBuilder = dynamic(
	() => import("@components/commons/table/cell.builder")
);
const TableBody = dynamic(() => import("@mui/material/TableBody"));
const TableRow = dynamic(() => import("@mui/material/TableRow"));
const SatuanActionBtn = dynamic(() => import("./action"));

const SatuanTableBody = () => {
	const { pageRequest, sortRequest, status, satuan } = useSatuanStore();

	const qc = useQueryClient();
	const data = qc.getQueryData([
		"master.satuan",
		{ pageRequest, sortRequest, status, satuan },
	]) as SatuanWithPagination | undefined;

	if (!data) return null;
	let urut = data.number * data.size + 1;

	return (
		<TableBody>
			{data.content.map((satuan) => (
				<TableRow hover key={satuan.id}>
					<CellBuilder value={urut++} />
					<CellBuilder value={satuan.satuan} />
					<CellBuilder value={satuan.status} chip />
					<SatuanActionBtn row={satuan} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default SatuanTableBody;

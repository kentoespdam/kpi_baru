import CellBuilder from "@components/commons/table/cell.builder";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { SatuanWithPagination } from "@myTypes/entity/satuan";
import { useSatuanStore } from "@store/filter/master/satuan";
import { useQueryClient } from "@tanstack/react-query";
import SatuanActionBtn from "./action";

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

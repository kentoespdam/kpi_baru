"use client";

import { PerilakuWithPagination } from "@myTypes/entity/perilaku";
import { usePerilakuStore } from "@store/filter/master/perilaku";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const CellBuilder = dynamic(
	() => import("@components/commons/table/cell.builder")
);
const TableBody = dynamic(() => import("@mui/material/TableBody"));
const TableRow = dynamic(() => import("@mui/material/TableRow"));
const PerilakuActionBtn = dynamic(() => import("./action"));

const PerilakuTableBody = () => {
	const { pageRequest, sortRequest, status, kompetensi, uraian } =
		usePerilakuStore();
	const qc = useQueryClient();
	const data = qc.getQueryData([
		"master.perilaku",
		{ pageRequest, sortRequest },
		{ status, kompetensi, uraian },
	]) as PerilakuWithPagination | undefined;
	if (!data) return null;
	let urut = data.number * data.size + 1;

	return (
		<TableBody>
			{data.content.map((perilaku) => (
				<TableRow hover key={perilaku.id}>
					<CellBuilder value={urut++} />
					<CellBuilder value={perilaku.kompetensi} />
					<CellBuilder value={perilaku.uraian} />
					<CellBuilder value={perilaku.urut} />
					<CellBuilder value={perilaku.status} chip />
					<PerilakuActionBtn row={perilaku} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default PerilakuTableBody;

import { IKpiUraian } from "@interfaces/ITransKpiPegawai";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import CellBuilder from "@commons/components/table/cell.builder";
import React from "react";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { useTransUraianStore } from "@storage/transaction/atasan/trans.uraian.store";
import {
	EditBtn,
	ViewBtn,
} from "@transaction/kpi/kpi-component/staff/table/cell.button";

type KpiStaffUraianCellProps = {
	uraian: IKpiUraian;
};
const KpiStaffUraianCell = (props: KpiStaffUraianCellProps) => {
	const { uraian } = props;
	const { fileList } = uraian;

	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);
	const setUraian = useTransUraianStore((state) => state.setUraian);

	function editHandler() {
		setUraian(uraian);
		toggleDialog();
	}

	return (
		<>
			<CellBuilder
				sx={{ maxWidth: 120, whiteSpace: "pre-wrap" }}
				value={uraian.uraian}
			/>
			<CellBuilder value={uraian.volume} />
			<CellBuilder value={uraian.satuan} />
			<CellBuilder value={uraian.waktu} />
			<CellBuilder value={uraian.bobot} />
			<CellBuilder
				value={uraian.capaianVolume}
				sx={{ bgcolor: "yellow" }}
			/>
			<CellBuilder value={uraian.satuan} align="center" />
			<CellBuilder
				value={uraian.capaianWaktu}
				sx={{
					bgColor:
						uraian.waktu !== "Akhir Bulan" ? "yellow" : "white",
				}}
			/>
			<CellBuilder value={uraian.nilaiProdukKerja} />
			<CellBuilder value={Number(uraian.nilaiWaktu)} />
			<CellBuilder value={uraian.nilaiTotalUraian} />
			<TableCell>
				<Stack direction="row" spacing={1}>
					<EditBtn onClick={editHandler} />
					{fileList.length > 0 && (
						<ViewBtn fileList={fileList} uraianId={uraian.id} />
					)}
				</Stack>
			</TableCell>
		</>
	);
};

type KpiStaffUraianProps = {
	uraianList: IKpiUraian[];
	first?: boolean;
};
const KpiStaffUraian = (props: KpiStaffUraianProps) => {
	const { uraianList, first } = props;

	if (first) return <KpiStaffUraianCell uraian={uraianList[0]} />;
	return (
		<>
			{uraianList.map((uraian, index) =>
				index === 0 ? null : (
					<TableRow key={uraian.id}>
						<KpiStaffUraianCell uraian={uraian} />
					</TableRow>
				)
			)}
		</>
	);
};

export default KpiStaffUraian;

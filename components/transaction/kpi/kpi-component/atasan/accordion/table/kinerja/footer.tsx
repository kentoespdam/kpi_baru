import { ITransKpiPegawai } from "@interfaces/ITransKpiPegawai";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useKpiStaffStore } from "@storage/transaction/atasan/kpi.staff.store";
import React from "react";
import { shallow } from "zustand/shallow";

type KpiStaffTableFooterProps = {
	transKpiPegawai?: ITransKpiPegawai;
};
const KpiStaffTableFooter = (props: KpiStaffTableFooterProps) => {
	const { transKpiPegawai } = props;

	return (
		<TableBody>
			<TableRow>
				<TableCell colSpan={12} align="right">
					Total
				</TableCell>
				<TableCell align="right">
					{transKpiPegawai?.nilaiTotal ?? 0}
				</TableCell>
			</TableRow>
		</TableBody>
	);
};

export default KpiStaffTableFooter;

"use client";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TransKpiFileListTableBody from "./table/body";
import TransKpiFileListTableHead from "./table/head";

type TransKpiFileListComponentProps = {
	indikatorId: number;
	uraianId: number;
};
const TransKpiFileListComponent = (props: TransKpiFileListComponentProps) => {
	const { indikatorId, uraianId } = props;

	return (
		<TableContainer>
			<Table>
				<TransKpiFileListTableHead />
				<TransKpiFileListTableBody
					indikatorId={indikatorId}
					uraianId={uraianId}
				/>
			</Table>
		</TableContainer>
	);
};

export default TransKpiFileListComponent;

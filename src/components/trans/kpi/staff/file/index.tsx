"use client";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TransKpiFileListTableBody from "./table/body";
import TransKpiFileListTableHead from "./table/head";
import { TransFile } from "@myTypes/entity/trans.file";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getFiles } from "@utils/trans/file";
import LinearProgress from "@mui/material/LinearProgress";

type TransKpiFileListComponentProps = {
	uraianId: number;
};
const TransKpiFileListComponent = (props: TransKpiFileListComponentProps) => {
	const { uraianId } = props;

	const queries = useQueries({
		queries: [
			{
				queryKey: ["trans.file.list", Number(uraianId)],
				queryFn: getFiles,
				enabled: !!uraianId,
			},
		],
	});

	return (
		<TableContainer>
			{queries[0].isFetching || queries[0].isLoading ? (
				<LinearProgress />
			) : null}
			<Table>
				<TransKpiFileListTableHead />
				<TransKpiFileListTableBody uraianId={uraianId} />
			</Table>
		</TableContainer>
	);
};

export default TransKpiFileListComponent;

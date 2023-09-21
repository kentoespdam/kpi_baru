"use client";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { TransFile } from "@myTypes/entity/trans.file";
import { TransKpiQKeyProps } from "@myTypes/entity/trans.kpi";
import { useQueries } from "@tanstack/react-query";
import { getFiles } from "@utils/trans/file";
import TransFileListItem from "./item";

type TransKpiFileListComponentProps = {
	uraianId: number;
	qKeyKpiStaff: (string | TransKpiQKeyProps)[];
};
const TransKpiFileListComponent = (props: TransKpiFileListComponentProps) => {
	const { uraianId } = props;

	const queries = useQueries({
		queries: [
			{
				queryKey: ["trans.file.list", Number(uraianId)],
				queryFn: getFiles,
				enabled: !!uraianId,
				retry: 2,
			},
		],
	});

	return queries[0].isFetching ? (
		<LinearProgress />
	) : queries[0].isError || !queries[0].data ? (
		<Typography>File Not Found!</Typography>
	) : (
		<List component="nav">
			{queries[0].data.map((item: TransFile, index: number) => (
				<TransFileListItem
					key={index}
					uraianId={uraianId}
					uraianFile={item}
					qKeyKpiStaff={props.qKeyKpiStaff}
				/>
			))}
		</List>
	);
};

export default TransKpiFileListComponent;

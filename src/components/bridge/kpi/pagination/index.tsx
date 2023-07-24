import TablePagination from "@mui/material/TablePagination";
import { BridgeKpiWithPagination } from "@myTypes/entity/bridge.kpi";
import { useBridgeKpiStore } from "@store/filter/bridge/kpi";
import { useQueryClient } from "@tanstack/react-query";

const BridgeKpiPagination = () => {
	const {
		pageRequest,
		setPageRequest,
		sortRequest,
		nipam,
		name,
		position,
		organization,
		level,
		kpi,
		status,
	} = useBridgeKpiStore();
	const qc = useQueryClient();

	const data = qc.getQueryData([
		"bridge.kpi",
		{
			pageRequest,
			sortRequest,
		},
		{
			nipam,
			name,
			position,
			organization,
			level,
			kpi,
			status,
		},
	]) as BridgeKpiWithPagination | undefined;

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) =>
		setPageRequest({
			page: newPage,
			size: pageRequest.size,
		});
	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) =>
		setPageRequest({
			page: 0,
			size: +event.target.value,
		});

	return (
		<TablePagination
			component="div"
			count={data?.totalElements ?? 0}
			page={data?.number ?? 0}
			onPageChange={handleChangePage}
			rowsPerPage={data?.size ?? 10}
			onRowsPerPageChange={handleChangeRowsPerPage}
			showFirstButton
			showLastButton
		/>
	);
};

export default BridgeKpiPagination;

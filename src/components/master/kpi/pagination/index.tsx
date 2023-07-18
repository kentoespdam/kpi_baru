import TablePagination from "@mui/material/TablePagination";
import { KpiWithPagination } from "@myTypes/entity/kpi";
import { useKpiStore } from "@store/filter/master/kpi";
import { useQueryClient } from "@tanstack/react-query";

const KpiPagination = () => {
	const qc = useQueryClient();
	const {
		pageRequest,
		setPageRequest,
		sortRequest,
		organization,
		position,
		profesi,
		name,
		grade,
	} = useKpiStore();
	const data = qc.getQueryData([
		"master.kpi",
		{ pageRequest, sortRequest },
		{
			organization,
			position,
			profesi,
			name,
			grade,
		},
	]) satisfies KpiWithPagination | undefined;

	const handleChangePage = async (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) =>
		setPageRequest({
			page: newPage,
			size: data?.size ?? 10,
		});

	const handleChangeRowsPerPage = async (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) =>
		setPageRequest({
			page: 0,
			size: +event.currentTarget.value,
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

export default KpiPagination;

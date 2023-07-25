import TablePagination from "@mui/material/TablePagination";
import { PerilakuWithPagination } from "@myTypes/entity/perilaku";
import { useBridgePerilakuStore } from "@store/filter/bridge/perilaku";
import { useQueryClient } from "@tanstack/react-query";

const BridgePerilakuPagination = () => {
	const {
		pageRequest,
		setPageRequest,
		sortRequest,
		perilaku,
		level,
		status,
	} = useBridgePerilakuStore();
	const qc = useQueryClient();
	const data = qc.getQueryData([
		"bridge.perilaku",
		{ pageRequest, sortRequest },
		{ perilaku, level, status },
	]) as PerilakuWithPagination | undefined;

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

export default BridgePerilakuPagination;

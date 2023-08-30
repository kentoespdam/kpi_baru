import TablePagination from "@mui/material/TablePagination";
import { SatuanWithPagination } from "@myTypes/entity/satuan";
import { useSatuanStore } from "@store/filter/master/satuan";
import { useQueryClient } from "@tanstack/react-query";

const SatuanPagination = () => {
	const qc = useQueryClient();
	const { pageRequest, setPageRequest, sortRequest, status, satuan } =
		useSatuanStore();

	const data = qc.getQueryData([
		"master.satuan",
		{ pageRequest, sortRequest, status, satuan },
	]) as SatuanWithPagination | undefined;

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

export default SatuanPagination;

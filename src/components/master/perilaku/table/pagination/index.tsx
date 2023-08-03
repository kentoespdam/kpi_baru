"use client";

import TablePagination from "@mui/material/TablePagination";
import { PerilakuWithPagination } from "@myTypes/entity/perilaku";
import { usePerilakuStore } from "@store/filter/master/perilaku";
import { useQueryClient } from "@tanstack/react-query";

const PerilakuPagination = () => {
	const {
		pageRequest,
		setPageRequest,
		sortRequest,
		status,
		kompetensi,
		uraian,
	} = usePerilakuStore();
	const qc = useQueryClient();
	const data = qc.getQueryData([
		"master.perilaku",
		{ pageRequest, sortRequest },
		{ status, kompetensi, uraian },
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

export default PerilakuPagination;

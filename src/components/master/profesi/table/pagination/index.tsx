"use client";

import TablePagination from "@mui/material/TablePagination";
import { ProfesiWithPagination } from "@myTypes/entity/profesi";
import { useProfesiStore } from "@store/filter/master/profesi";
import { useQueryClient } from "@tanstack/react-query";

const ProfesiPagination = () => {
	const { pageRequest, setPageRequest, sortRequest, status, name, level } =
		useProfesiStore();
	const qc = useQueryClient();
	const data = qc.getQueryData([
		"master.profesi",
		{ pageRequest, sortRequest },
		{ status, name, level },
	]) as ProfesiWithPagination | undefined;

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

export default ProfesiPagination;

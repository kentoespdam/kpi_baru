"use client";

import TablePagination from "@mui/material/TablePagination";
import { GradeWithPagination } from "@myTypes/entity/grade";
import { useGradeStore } from "@store/filter/master/grade";
import { useQueryClient } from "@tanstack/react-query";

const GradePagination = () => {
	const qc = useQueryClient();
	const {
		pageRequest,
		setPageRequest,
		sortRequest,
		status,
		grade,
		tukin,
		level,
	} = useGradeStore();

	const data = qc.getQueryData([
		"master.grade",
		{ pageRequest, sortRequest },
		{ status, grade, tukin, level },
	]) as GradeWithPagination | undefined;

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

export default GradePagination;

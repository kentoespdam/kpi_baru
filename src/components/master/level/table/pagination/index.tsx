"use client";

import TablePagination from "@mui/material/TablePagination";
import { LevelWithPagination } from "@myTypes/entity/level";
import { useLevelStore } from "@store/filter/master/level";
import { useQueryClient } from "@tanstack/react-query";

const LevelPagination = () => {
	const qc = useQueryClient();
	const { pageRequest, setPageRequest, sortRequest, status, level } =
		useLevelStore((state) => ({
			pageRequest: state.pageRequest,
			setPageRequest: state.setPageRequest,
			sortRequest: state.sortRequest,
			status: state.status,
			level: state.level,
		}));
	const data = qc.getQueryData([
		"master.level",
		{ pageRequest, sortRequest, status, level },
	]) as LevelWithPagination | undefined;

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

export default LevelPagination;

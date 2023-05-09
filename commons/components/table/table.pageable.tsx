import { IApiResponse, IPages } from "@interfaces/ICommons";
import TablePagination from "@mui/material/TablePagination";

interface TablePageableProps<T> {
	pages: IApiResponse<IPages<unknown>> | undefined;
	setCurPage: (page: number) => void;
	pageRequest: T;
	setPageRequest: (pageRequest: T) => void;
}

function TablePageable<T>(props: TablePageableProps<T>) {
	const { pages, setCurPage, pageRequest, setPageRequest } = props;

	async function handleChangePage(
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) {
		setCurPage(newPage);
		setPageRequest({
			...pageRequest,
			page: newPage,
		});
	}
	async function handleChangeRowsPerPage(
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setCurPage(0);
		setPageRequest({
			...pageRequest,
			page: 0,
			size: Number(event.target.value),
		});
	}

	return (
		<TablePagination
			component="div"
			count={pages?.data?.totalElements ?? 0}
			page={pages?.data?.number ?? 0}
			onPageChange={handleChangePage}
			rowsPerPage={pages?.data?.size ?? 10}
			onRowsPerPageChange={handleChangeRowsPerPage}
		/>
	);
}

export default TablePageable;

import TableLoading from "@commons/components/table/table.loading";
import TablePageable from "@commons/components/table/table.pageable";
import useAsync from "@commons/helpers/useAsync";
import StripedTableStyle from "@commons/theme/striped.table.style";
import TableContainer from "@mui/material/TableContainer";
import {
	fetchIndikatorTable,
	useIndikatorStore
} from "@storage/master/indikator.store";
import { Suspense } from "react";
import { shallow } from "zustand/shallow";
import IndikatorTableBody from "./indikator.table.body";
import IndikatorTableHead from "./indikator.table.head";

const FetchTable = () => {
	const { pageRequest, setPages } = useIndikatorStore(
		(state) => ({
			pageRequest: state.pageRequest,
			setPages: state.setPages,
		}),
		shallow
	);

	const { status, error } = useAsync(
		() => fetchIndikatorTable(pageRequest, setPages),
		[pageRequest]
	);

	if (status === "idle") return null;
	if (status === "pending") return <TableLoading colSpan={6} />;
	if (status === "error")
		return <TableLoading colSpan={6} message={JSON.stringify(error)} />;

	return <IndikatorTableBody />;
};

const IndikatorTable = () => {
	const { pages, setCurPage, pageRequest, setPageRequest } =
		useIndikatorStore(
			(state) => ({
				pages: state.pages,
				setCurPage: state.setCurPage,
				pageRequest: state.pageRequest,
				setPageRequest: state.setPageRequest,
			}),
			shallow
		);

	return (
		<TableContainer>
			<Suspense>
				<StripedTableStyle>
					<IndikatorTableHead />
					<FetchTable />
				</StripedTableStyle>
				<TablePageable
					pages={pages}
					setCurPage={setCurPage}
					pageRequest={pageRequest}
					setPageRequest={setPageRequest}
				/>
			</Suspense>
		</TableContainer>
	);
};

export default IndikatorTable;

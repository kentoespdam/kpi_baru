import TableLoading from "@commons/components/table/table.loading";
import TablePageable from "@commons/components/table/table.pageable";
import useAsync from "@commons/helpers/useAsync";
import StripedTableStyle from "@commons/theme/striped.table.style";
import TableContainer from "@mui/material/TableContainer";
import { fetchGradeTable, useGradeStore } from "@storage/master/grade.store";
import { Suspense } from "react";
import { shallow } from "zustand/shallow";
import GradeTableBody from "./grade.table.body";
import GradeTableHead from "./grade.table.head";

const FetchTable = () => {
	const { pageRequest, setPages } = useGradeStore(
		(state) => ({
			pageRequest: state.pageRequest,
			setPages: state.setPages,
		}),
		shallow
	);

	const { status, error } = useAsync(
		() => fetchGradeTable(pageRequest, setPages),
		[pageRequest]
	);

	if (status === "idle") return null;
	if (status === "pending") return <TableLoading colSpan={6} />;
	if (status === "error")
		return <TableLoading colSpan={6} message={JSON.stringify(error)} />;

	return <GradeTableBody />;
};

const GradeTable = () => {
	const { pages, setCurPage, pageRequest, setPageRequest } = useGradeStore(
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
					<GradeTableHead />
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

export default GradeTable;

import TableLoading from "@commons/components/table/table.loading";
import TablePageable from "@commons/components/table/table.pageable";
import useAsync from "@commons/helpers/useAsync";
import StripedTableStyle from "@commons/theme/striped.table.style";
import TableContainer from "@mui/material/TableContainer";
import { fetchLevelTable, useLevelStore } from "@storage/master/level.store";
import { Suspense } from "react";
import { shallow } from "zustand/shallow";
import LevelTableBody from "./level.table.body";
import LevelTableHead from "./level.table.head";

const FetchTable = () => {
	const { pageRequest, setPages } = useLevelStore(
		(state) => ({
			pageRequest: state.pageRequest,
			setPages: state.setPages,
		}),
		shallow
	);

	const { status, error } = useAsync(
		() => fetchLevelTable(pageRequest, setPages),
		[pageRequest]
	);

	if (status === "idle") return null;
	if (status === "pending") return <TableLoading colSpan={4} />;
	if (status === "error")
		return <TableLoading colSpan={4} message={JSON.stringify(error)} />;

	return <LevelTableBody />;
};

const LevelTable = () => {
	const { pages, setCurPage, pageRequest, setPageRequest } = useLevelStore(
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
					<LevelTableHead />
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

export default LevelTable;

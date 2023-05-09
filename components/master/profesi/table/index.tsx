import TableLoading from "@commons/components/table/table.loading";
import TablePageable from "@commons/components/table/table.pageable";
import useAsync from "@commons/helpers/useAsync";
import StripedTableStyle from "@commons/theme/striped.table.style";
import TableContainer from "@mui/material/TableContainer";
import {
	fetchProfesiTable,
	useProfesiStore
} from "@storage/master/profesi.store";
import { Suspense } from "react";
import { shallow } from "zustand/shallow";
import ProfesiTableBody from "./profesi.table.body";
import ProfesiTableHead from "./profesi.table.head";

const FetchTable = () => {
	const { pageRequest, setPages } = useProfesiStore(
		(state) => ({
			pageRequest: state.pageRequest,
			setPages: state.setPages,
		}),
		shallow
	);

	const { status, error } = useAsync(
		() => fetchProfesiTable(pageRequest, setPages),
		[pageRequest]
	);

	if (status === "idle") return null;
	if (status === "pending") return <TableLoading colSpan={6} />;
	if (status === "error")
		return <TableLoading colSpan={6} message={JSON.stringify(error)} />;

	return <ProfesiTableBody />;
};

const ProfesiTable = () => {
	const { pages, setCurPage, pageRequest, setPageRequest } = useProfesiStore(
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
					<ProfesiTableHead />
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

export default ProfesiTable;

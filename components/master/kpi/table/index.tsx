import TableLoading from "@commons/components/table/table.loading";
import TablePageable from "@commons/components/table/table.pageable";
import useAsync from "@commons/helpers/useAsync";
import StripedTableStyle from "@commons/theme/striped.table.style";
import TableContainer from "@mui/material/TableContainer";
import { fetchKpiTable, useKpiStore } from "@storage/master/kpi.store";
import { Suspense } from "react";
import { shallow } from "zustand/shallow";
import KpiTableBody from "./kpi.table.body";
import KpiTableHead from "./kpi.table.head";

const FetchTable = () => {
	const { pageRequest, setPages } = useKpiStore(
		(state) => ({
			pageRequest: state.pageRequest,
			setPages: state.setPages,
		}),
		shallow
	);

	const { status, error } = useAsync(
		() => fetchKpiTable(pageRequest, setPages),
		[pageRequest]
	);

	if (status === "idle") return null;
	if (status === "pending") return <TableLoading colSpan={6} />;
	if (status === "error")
		return <TableLoading colSpan={6} message={JSON.stringify(error)} />;

	return <KpiTableBody />;
};

const KpiTable = () => {
	const { pages, setCurPage, pageRequest, setPageRequest } = useKpiStore(
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
					<KpiTableHead />
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

export default KpiTable;

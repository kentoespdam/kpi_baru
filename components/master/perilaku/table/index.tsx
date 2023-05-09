import TableLoading from "@commons/components/table/table.loading";
import TablePageable from "@commons/components/table/table.pageable";
import StripedTableStyle from "@commons/theme/striped.table.style";
import useAsync from "@helpers/useAsync";
import TableContainer from "@mui/material/TableContainer";
import {
	fetchPerilakuTable,
	usePerilakuStore,
} from "@storage/master/perilaku.store";
import { Suspense } from "react";
import { shallow } from "zustand/shallow";
import PerilakuTableBody from "./perilaku.table.body";
import PerilakuTableHead from "./perilaku.table.head";

const FetchTable = () => {
	const { pageRequest, setPages } = usePerilakuStore(
		(state) => ({
			pageRequest: state.pageRequest,
			setPages: state.setPages,
		}),
		shallow
	);
	const { status, error } = useAsync(
		() => fetchPerilakuTable(pageRequest, setPages),
		[pageRequest]
	);
	if (status === "idle") return null;
	if (status === "pending") return <TableLoading colSpan={6} />;
	if (status === "error")
		return <TableLoading colSpan={6} message={JSON.stringify(error)} />;
	return <PerilakuTableBody />;
};

const PerilakuTable = () => {
	const { pages, setCurPage, pageRequest, setPageRequest } = usePerilakuStore(
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
					<PerilakuTableHead />
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

export default PerilakuTable;

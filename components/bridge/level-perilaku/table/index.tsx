import TableLoading from "@commons/components/table/table.loading";
import TablePageable from "@commons/components/table/table.pageable";
import StripedTableStyle from "@commons/theme/striped.table.style";
import useAsync from "@helpers/useAsync";
import TableContainer from "@mui/material/TableContainer";
import {
	fetchBridgeLevelPerilakuTable,
	useBridgeLevelPerilakuStore,
} from "@storage/bridge/level-perilaku.store";
import { Suspense } from "react";
import { shallow } from "zustand/shallow";
import BridgeLevelPerilakuTableBody from "./body";
import BridgeLevelPerilakuTableHead from "./head";

const FetchTable = () => {
	const { pageRequest, setPages } = useBridgeLevelPerilakuStore(
		(state) => ({
			pageRequest: state.pageRequest,
			setPages: state.setPages,
		}),
		shallow
	);

	const { status, error } = useAsync(
		() => fetchBridgeLevelPerilakuTable(pageRequest, setPages),
		[pageRequest]
	);

	if (status === "idle") return null;
	if (status === "pending") return <TableLoading colSpan={5} />;
	if (status === "error")
		return <TableLoading colSpan={5} message={JSON.stringify(error)} />;
	return <BridgeLevelPerilakuTableBody />;
};

const LevelPerilakuTable = () => {
	const { pages, setCurPage, pageRequest, setPageRequest } =
		useBridgeLevelPerilakuStore(
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
					<BridgeLevelPerilakuTableHead />
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

export default LevelPerilakuTable;

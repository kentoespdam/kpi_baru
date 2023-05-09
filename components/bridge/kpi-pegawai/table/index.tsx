import TableLoading from "@commons/components/table/table.loading";
import TablePageable from "@commons/components/table/table.pageable";
import StripedTableStyle from "@commons/theme/striped.table.style";
import useAsync from "@helpers/useAsync";
import TableContainer from "@mui/material/TableContainer";
import {
	fetchBridgeKpiPegawaiTable,
	useBridgeKpiPegawaiStore,
} from "@storage/bridge/kpi-pegawai.store";
import { lazy, Suspense } from "react";
import { shallow } from "zustand/shallow";
import BridgeKpiPegawaiTableHead from "./head";

const BridgeKpiPegawaiTableBody = lazy(() => import("./body"));

const FetchTable = () => {
	const { pageRequest, setPages } = useBridgeKpiPegawaiStore(
		(state) => ({
			pageRequest: state.pageRequest,
			setPages: state.setPages,
		}),
		shallow
	);

	const { status, error } = useAsync(
		() => fetchBridgeKpiPegawaiTable(pageRequest, setPages),
		[pageRequest]
	);

	if (status === "idle") return null;
	if (status === "pending") return <TableLoading colSpan={5} />;
	if (status === "error")
		return <TableLoading colSpan={8} message={error?.message} />;
	return <BridgeKpiPegawaiTableBody />;
};

const KpiPegawaiTable = () => {
	const { pages, setCurPage, pageRequest, setPageRequest } =
		useBridgeKpiPegawaiStore(
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
					<BridgeKpiPegawaiTableHead />
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

export default KpiPegawaiTable;

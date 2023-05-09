import { shallow } from "zustand/shallow";
import TableLoading from "@commons/components/table/table.loading";
import useAsync from "@helpers/useAsync";
import {
	fetchUraianIndikatorTable,
	useUraianIndikatorStore,
} from "@storage/master/uraian.indikator.store";
import UraianIndikatorTableBody from "./uraian-indikator.table.body";
import TableContainer from "@mui/material/TableContainer";
import { Suspense } from "react";
import StripedTableStyle from "@commons/theme/striped.table.style";
import UraianIndikatorTableHead from "./uraian-indikator.table.head";
import TablePageable from "@commons/components/table/table.pageable";

const FetchTable = () => {
	const { pageRequest, setPages } = useUraianIndikatorStore(
		(state) => ({
			pageRequest: state.pageRequest,
			setPages: state.setPages,
		}),
		shallow
	);

	const { status, error } = useAsync(
		() => fetchUraianIndikatorTable(pageRequest, setPages),
		[pageRequest]
	);

	if (status === "idle") return null;
	if (status === "pending") return <TableLoading colSpan={10} />;
	if (status === "error")
		return <TableLoading colSpan={10} message={JSON.stringify(error)} />;

	return <UraianIndikatorTableBody />;
};

const UraianIndikatorTable = () => {
	const { pages, setCurPage, pageRequest, setPageRequest } =
		useUraianIndikatorStore(
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
					<UraianIndikatorTableHead />
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

export default UraianIndikatorTable;

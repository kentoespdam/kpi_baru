// import HeaderSearchBuilder from "@components/commons/table/head/search";
// import HeaderSortBuilder from "@components/commons/table/head/sort";
// const TableHead=dynamic(()=>import("@mui/material/TableHead"))
import { bridgeKpiHead } from "@myTypes/entity/bridge.kpi";
import { useBridgeKpiStore } from "@store/filter/bridge/kpi";
import dynamic from "next/dynamic";

const HeaderSearchBuilder = dynamic(
	() => import("@components/commons/table/head/search")
);
const HeaderSortBuilder = dynamic(
	() => import("@components/commons/table/head/sort")
);
const TableHead = dynamic(() => import("@mui/material/TableHead"));

const BridgeKpiTableHead = () => {
	const {
		sortRequest,
		setSortRequest,
		pageRequest,
		setPageRequest,
		setKeyVal,
		status,
	} = useBridgeKpiStore();

	const handleSort = (sort: string | null, direction: "asc" | "desc") =>
		setSortRequest({ sort, direction });

	const handleSearch = (field: string, value: any) => {
		setPageRequest({
			page: 0,
			size: pageRequest.size,
		});
		setKeyVal(field, value);
	};
	return (
		<TableHead>
			<HeaderSortBuilder
				headers={bridgeKpiHead}
				handleSort={handleSort}
				sortRequest={sortRequest}
			/>
			<HeaderSearchBuilder
				headers={bridgeKpiHead}
				handleSearch={handleSearch}
				status={status}
			/>
		</TableHead>
	);
};

export default BridgeKpiTableHead;

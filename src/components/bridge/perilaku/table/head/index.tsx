import { bridgePerilakuHead } from "@myTypes/entity/bridge.perilaku";
import { useBridgePerilakuStore } from "@store/filter/bridge/perilaku";
import dynamic from "next/dynamic";

const HeaderSearchBuilder = dynamic(
	() => import("@components/commons/table/head/search")
);
const HeaderSortBuilder = dynamic(
	() => import("@components/commons/table/head/sort")
);
const TableHead = dynamic(() => import("@mui/material/TableHead"));

const BridgePerilakuTableHead = () => {
	const {
		pageRequest,
		setPageRequest,
		sortRequest,
		setSortRequest,
		setKeyVal,
		perilaku,
		level,
		status,
	} = useBridgePerilakuStore();

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
				headers={bridgePerilakuHead}
				handleSort={handleSort}
				sortRequest={sortRequest}
			/>
			<HeaderSearchBuilder
				headers={bridgePerilakuHead}
				handleSearch={handleSearch}
				perilaku={perilaku}
				level={level}
				status={status}
			/>
		</TableHead>
	);
};

export default BridgePerilakuTableHead;

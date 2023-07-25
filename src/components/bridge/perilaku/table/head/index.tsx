import HeaderSearchBuilder from "@components/commons/table/head/search";
import HeaderSortBuilder from "@components/commons/table/head/sort";
import TableHead from "@mui/material/TableHead";
import { bridgePerilakuHead } from "@myTypes/entity/bridge.perilaku";
import { useBridgePerilakuStore } from "@store/filter/bridge/perilaku";

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
				status={status}
			/>
		</TableHead>
	);
};

export default BridgePerilakuTableHead;

import { SearchValueProps } from "@components/commons/table/head/searchType";
import { levelHeader } from "@myTypes/entity/level";
import { useLevelStore } from "@store/filter/master/level";
import dynamic from "next/dynamic";

const HeaderSearchBuilder = dynamic(
	() => import("@components/commons/table/head/search")
);
const HeaderSortBuilder = dynamic(
	() => import("@components/commons/table/head/sort")
);
const TableHead = dynamic(() => import("@mui/material/TableHead"));

const LevelTableHead = () => {
	const { sortRequest, setSortRequest, setKeyVal, status } = useLevelStore();

	const handleSort = (sort: string | null, direction: "asc" | "desc") =>
		setSortRequest({ sort, direction });

	const handleSearch = (field: string, value: SearchValueProps) => {
		setKeyVal(field, value);
	};

	return (
		<TableHead>
			<HeaderSortBuilder
				headers={levelHeader}
				handleSort={handleSort}
				sortRequest={sortRequest}
			/>
			<HeaderSearchBuilder
				headers={levelHeader}
				handleSearch={handleSearch}
				status={status}
			/>
		</TableHead>
	);
};

export default LevelTableHead;

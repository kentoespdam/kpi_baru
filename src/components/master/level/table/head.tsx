import HeaderSearchBuilder from "@components/commons/table/head/search";
import HeaderSortBuilder from "@components/commons/table/head/sort";
import TableHead from "@mui/material/TableHead";
import { levelHeader } from "@myTypes/entity/level";
import { useLevelStore } from "src/store/filter/master/level";
import { shallow } from "zustand/shallow";

const LevelTableHead = () => {
	const { sortRequest, setSortRequest, setKeyVal } = useLevelStore(
		(state) => ({
			sortRequest: state.sortRequest,
			setSortRequest: state.setSortRequest,
			setKeyVal: state.setKeyVal,
		}),
		shallow
	);

	const handleSort = (sort: string | null, direction: "asc" | "desc") => {
		setSortRequest({ sort, direction });
	};

	const handleSearch = (field: string, value: string | number | null) => {
		setKeyVal(field, value);
	};

	return (
		<TableHead>
			<HeaderSortBuilder headers={levelHeader} handleSort={handleSort} />
			<HeaderSearchBuilder
				headers={levelHeader}
				handleSearch={handleSearch}
			/>
		</TableHead>
	);
};

export default LevelTableHead;

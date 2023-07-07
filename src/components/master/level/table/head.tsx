import HeaderSortBuilder from "@components/commons/table/head/sort";
import TableHead from "@mui/material/TableHead";
import { levelHeader } from "@myTypes/entity/level";
import { useLevelStore } from "src/store/filter/master/level";
import { shallow } from "zustand/shallow";

const LevelTableHead = () => {
	const { sortRequest, setSortRequest } = useLevelStore(
		(state) => ({
			sortRequest: state.sortRequest,
			setSortRequest: state.setSortRequest,
		}),
		shallow
	);

	const handleSort = (sort: string | null, direction: "asc" | "desc") => {
		setSortRequest({ sort, direction });
	};
	return (
		<TableHead>
			<HeaderSortBuilder headers={levelHeader} handleSort={handleSort} />
		</TableHead>
	);
};

export default LevelTableHead;

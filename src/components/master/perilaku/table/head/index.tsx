import HeaderSearchBuilder from "@components/commons/table/head/search";
import HeaderSortBuilder from "@components/commons/table/head/sort";
import TableHead from "@mui/material/TableHead";
import { perilakuHeader } from "@myTypes/entity/perilaku";
import { usePerilakuStore } from "@store/filter/master/perilaku";
import { shallow } from "zustand/shallow";

const PerilakuTableHead = () => {
	const { sortRequest, setSortRequest, setKeyVal, status } = usePerilakuStore(
		(state) => ({
			sortRequest: state.sortRequest,
			setSortRequest: state.setSortRequest,
			setKeyVal: state.setKeyVal,
			status: state.status,
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
			<HeaderSortBuilder
				headers={perilakuHeader}
				handleSort={handleSort}
				sortRequest={sortRequest}
			/>
			<HeaderSearchBuilder
				headers={perilakuHeader}
				handleSearch={handleSearch}
				status={status}
			/>
		</TableHead>
	);
};

export default PerilakuTableHead;

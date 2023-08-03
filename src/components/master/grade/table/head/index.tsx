import HeaderSearchBuilder from "@components/commons/table/head/search";
import HeaderSortBuilder from "@components/commons/table/head/sort";
import TableHead from "@mui/material/TableHead";
import { gradeHeader } from "@myTypes/entity/grade";
import { useGradeStore } from "@store/filter/master/grade";
import { shallow } from "zustand/shallow";

const GradeTableHead = () => {
	const { sortRequest, setSortRequest, setKeyVal, status } = useGradeStore(
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
				headers={gradeHeader}
				handleSort={handleSort}
				sortRequest={sortRequest}
			/>
			<HeaderSearchBuilder
				headers={gradeHeader}
				handleSearch={handleSearch}
				status={status}
			/>
		</TableHead>
	);
};

export default GradeTableHead;

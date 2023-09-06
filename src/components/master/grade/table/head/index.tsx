import { SearchValueProps } from "@components/commons/table/head/search";
const TableHead=dynamic(()=>import("@mui/material/TableHead"))
import { gradeHeader } from "@myTypes/entity/grade";
import { useGradeStore } from "@store/filter/master/grade";
import dynamic from "next/dynamic";

const HeaderSearchBuilder = dynamic(
	() => import("@components/commons/table/head/search")
);
const HeaderSortBuilder = dynamic(
	() => import("@components/commons/table/head/sort")
);

const GradeTableHead = () => {
	const { sortRequest, setSortRequest, setKeyVal, status } = useGradeStore(
		(state) => ({
			sortRequest: state.sortRequest,
			setSortRequest: state.setSortRequest,
			setKeyVal: state.setKeyVal,
			status: state.status,
		})
	);

	const handleSort = (sort: string | null, direction: "asc" | "desc") => {
		setSortRequest({ sort, direction });
	};

	const handleSearch = (field: string, value: SearchValueProps) => {
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

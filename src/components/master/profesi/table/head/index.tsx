import { profesiHeader } from "@myTypes/entity/profesi";
import { useProfesiStore } from "@store/filter/master/profesi";
import dynamic from "next/dynamic";

const HeaderSearchBuilder = dynamic(
	() => import("@components/commons/table/head/search")
);
const HeaderSortBuilder = dynamic(
	() => import("@components/commons/table/head/sort")
);
const TableHead = dynamic(() => import("@mui/material/TableHead"));

const ProfesiTableHead = () => {
	const {
		sortRequest,
		setSortRequest,
		pageRequest,
		setPageRequest,
		setKeyVal,
		status,
	} = useProfesiStore();

	const handleSort = (sort: string | null, direction: "asc" | "desc") => {
		setSortRequest({ sort, direction });
	};

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
				headers={profesiHeader}
				handleSort={handleSort}
				sortRequest={sortRequest}
			/>
			<HeaderSearchBuilder
				headers={profesiHeader}
				handleSearch={handleSearch}
				status={status}
			/>
		</TableHead>
	);
};

export default ProfesiTableHead;

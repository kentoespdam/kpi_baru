import HeaderSearchBuilder from "@components/commons/table/head/search";
import HeaderSortBuilder from "@components/commons/table/head/sort";
import TableHead from "@mui/material/TableHead";
import { profesiHeader } from "@myTypes/entity/profesi";
import { useProfesiStore } from "@store/filter/master/profesi";
import { shallow } from "zustand/shallow";

const ProfesiTableHead = () => {
	const {
		sortRequest,
		setSortRequest,
		pageRequest,
		setPageRequest,
		setKeyVal,
		status,
	} = useProfesiStore(
		(state) => ({
			sortRequest: state.sortRequest,
			setSortRequest: state.setSortRequest,
			pageRequest: state.pageRequest,
			setPageRequest: state.setPageRequest,
			setKeyVal: state.setKeyVal,
			status: state.status,
		}),
		shallow
	);

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

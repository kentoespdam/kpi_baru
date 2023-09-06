import { SearchValueProps } from "@components/commons/table/head/search";
import { satuanHeader } from "@myTypes/entity/satuan";
import { useSatuanStore } from "@store/filter/master/satuan";
import dynamic from "next/dynamic";

const HeaderSearchBuilder = dynamic(
	() => import("@components/commons/table/head/search")
);
const HeaderSortBuilder = dynamic(
	() => import("@components/commons/table/head/sort")
);
const TableHead = dynamic(() => import("@mui/material/TableHead"));

const SatuanTableHead = () => {
	const { sortRequest, setSortRequest, setKeyVal, status } = useSatuanStore();

	const handleSort = (sort: string | null, direction: "asc" | "desc") =>
		setSortRequest({ sort, direction });

	const handleSearch = (field: string, value: SearchValueProps) =>
		setKeyVal(field, value);

	return (
		<TableHead>
			<HeaderSortBuilder
				headers={satuanHeader}
				handleSort={handleSort}
				sortRequest={sortRequest}
			/>
			<HeaderSearchBuilder
				headers={satuanHeader}
				handleSearch={handleSearch}
				status={status}
			/>
		</TableHead>
	);
};

export default SatuanTableHead;

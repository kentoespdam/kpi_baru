import KpiAutocomplete from "@autocomplete/kpi";
import { Kpi } from "@myTypes/entity/kpi";
import { useState } from "react";
import { SearchTypeProps } from ".";

const SearchTypeKpi = (props: SearchTypeProps) => {
	const { field, handleSearch, kpi } = props;
	const [search, setSearchValue] = useState<Kpi | null>(kpi ? kpi : null);

	const handleChange = async (value: Kpi | null) => {
		setSearchValue(value);
		handleSearch(field, value);
	};

	return (
		<KpiAutocomplete
			search={search}
			setSearchValue={handleChange}
			required
			variant="outlined"
			size="small"
		/>
	);
};

export default SearchTypeKpi;

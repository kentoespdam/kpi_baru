import { useState } from "react";
import { SearchTypeProps } from ".";
import { Perilaku } from "@myTypes/entity/perilaku";
import PerilakuAutocomplete from "@autocomplete/perilaku";

const SearchtypePerilaku = (props: SearchTypeProps) => {
	const { field, handleSearch, perilaku } = props;
	const [search, setSearchValue] = useState<Perilaku | null>(
		perilaku ? perilaku : null
	);

	const handleChange = async (value: Perilaku | null) => {
		setSearchValue(value);
		handleSearch(field, value);
	};
	return (
		<PerilakuAutocomplete
			search={search}
			setSearchValue={handleChange}
			size="small"
		/>
	);
};

export default SearchtypePerilaku;

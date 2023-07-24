import LevelAutocomplete from "@components/commons/autocomplete/level";
import { Level } from "@myTypes/entity/level";
import { useState } from "react";
import { SearchTypeProps } from ".";

const SearchTypeLevel = (props: SearchTypeProps) => {
	const { field, handleSearch, level } = props;
	const [search, setSearchValue] = useState<Level | null>(
		level ? level : null
	);

	const handleChange = async (value: Level | null) => {
		setSearchValue(value);
		handleSearch(field, value);
	};

	return (
		<LevelAutocomplete
			search={search}
			setSearchValue={handleChange}
			required
			variant="outlined"
			size="small"
		/>
	);
};

export default SearchTypeLevel;

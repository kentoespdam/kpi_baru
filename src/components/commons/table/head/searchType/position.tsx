import PositionAutcomplete from "@components/commons/autocomplete/position";
import { Position } from "@myTypes/entity/position";
import { useState } from "react";
import { SearchTypeProps } from ".";

const SearchTypePosition = (props: SearchTypeProps) => {
	const { field, handleSearch, position } = props;
	const [search, setSearchValue] = useState<Position | null>(
		position ? position : null
	);

	const handleChange = async (value: Position | null) => {
		setSearchValue(value);
		handleSearch(field, value);
	};

	return (
		<PositionAutcomplete
			search={search}
			setSearchValue={handleChange}
			required
			variant="outlined"
			size="small"
		/>
	);
};

export default SearchTypePosition;

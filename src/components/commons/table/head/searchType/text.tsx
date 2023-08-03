import TextField from "@mui/material/TextField";
import { useRef } from "react";
import { SearchTypeProps } from ".";

const SearchTypeText = (props: SearchTypeProps) => {
	const { field, type, handleSearch } = props;

	const inputRef = useRef<HTMLInputElement>(null);
	const changeHandler = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (e.target.value === "") handleSearch(field, null);
		return;
	};
	const keyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const value = inputRef.current ? inputRef.current.value : null;
		if (e.key === "Enter") handleSearch(field, value);
	};
	return (
		<TextField
			id="search-field"
			label={`Search ${field}`}
			type={type === "text" ? "search" : "number"}
			variant="outlined"
			inputRef={inputRef}
			onChange={changeHandler}
			onKeyUp={keyUpHandler}
			size="small"
		/>
	);
};

export default SearchTypeText;

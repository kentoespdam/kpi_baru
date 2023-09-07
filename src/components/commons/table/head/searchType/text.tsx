import dynamic from "next/dynamic";
import { useRef } from "react";
import { SearchTypeProps } from ".";
const TextField = dynamic(() => import("@mui/material/TextField"));

const SearchTypeText = (props: SearchTypeProps) => {
	const { field, type, handleSearch, ...other } = props;

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

	const defaultValue = () => {
		switch (field) {
			case "nipam":
				return other.nipam ?? null;
			case "name":
				return other.name ?? null;
			default:
				return null;
		}
	};

	return (
		<TextField
			id={`search-field-${field}`}
			label={`Search ${field}`}
			type={type === "text" ? "search" : "number"}
			variant="outlined"
			inputRef={inputRef}
			onChange={changeHandler}
			onKeyUp={keyUpHandler}
			defaultValue={defaultValue()}
			size="small"
		/>
	);
};

export default SearchTypeText;

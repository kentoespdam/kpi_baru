import Autocomplete from "@mui/material/Autocomplete";
import { Position } from "@myTypes/entity/position";
import { useQuery } from "@tanstack/react-query";
import { getList } from "@utils/eo/position";
import LoadingAutocomplete from "./loading";
import TextField from "@mui/material/TextField";

type PositionAutcompleteProps = {
	search: Position | null;
	setSearchValue: (value: Position | null) => void;
	required?: boolean;
	variant?: "standard" | "filled" | "outlined";
	size?: "small" | "medium";
};
const PositionAutcomplete = (props: PositionAutcompleteProps) => {
	const { search, setSearchValue, required, variant, size } = props;
	const { status, error, data } = useQuery({
		queryKey: ["position.autocomplete"],
		queryFn: getList,
	});

	if (status === "loading") return <LoadingAutocomplete />;
	if (status === "error") return <div>{JSON.stringify(error)}</div>;
	return (
		<Autocomplete
			options={data!}
			getOptionLabel={(option: Position) => option.name}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Search Position"
					variant={variant}
				/>
			)}
			renderOption={(props, option) => {
				return (
					<li {...props} key={option.id}>
						{option.name}
					</li>
				);
			}}
			value={search ?? null}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			onChange={(e, v) => {
				setSearchValue(v);
			}}
			aria-required={required}
			sx={{ minWidth: 200 }}
			size={size}
		/>
	);
};

export default PositionAutcomplete;

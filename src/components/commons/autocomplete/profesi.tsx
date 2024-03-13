import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Profesi } from "@myTypes/entity/profesi";
import { useQuery } from "@tanstack/react-query";
import { getList } from "@utils/master/profesi";
import LoadingAutocomplete from "./loading";
import { SxProps } from "@mui/material/styles";

type PositionAutcompleteProps = {
	search: Profesi | null;
	setSearchValue: (value: Profesi | null) => void;
	required?: boolean;
	variant?: "standard" | "filled" | "outlined";
	size?: "small" | "medium";
	sx?: SxProps;
};

const ProfesiAutocomplete = (props: PositionAutcompleteProps) => {
	const { search, setSearchValue, variant, sx } = props;
	const { status, error, data } = useQuery({
		queryKey: ["profesi.autocomplete"],
		queryFn: getList,
	});

	if (status === "loading") return <LoadingAutocomplete />;
	if (status === "error") return <div>{JSON.stringify(error)}</div>;

	return (
		<Autocomplete
			options={data}
			getOptionLabel={(option: Profesi) => option.name}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Profesi"
					variant={variant ? variant : "standard"}
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
			sx={sx}
		/>
	);
};

export default ProfesiAutocomplete;

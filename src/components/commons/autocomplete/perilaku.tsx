import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Perilaku } from "@myTypes/entity/perilaku";
import { useQuery } from "@tanstack/react-query";
import { getList } from "@utils/master/perilaku";
import LoadingAutocomplete from "./loading";

type PerilakuAutocompleteProps = {
	search: Perilaku | null;
	setSearchValue: (value: Perilaku | null) => void;
	required?: boolean;
	variant?: "standard" | "filled" | "outlined";
	size?: "small" | "medium";
};
const PerilakuAutocomplete = (props: PerilakuAutocompleteProps) => {
	const { search, setSearchValue, required, size } = props;
	const { status, error, data } = useQuery({
		queryKey: ["perilaku.autocomplete"],
		queryFn: getList,
	});

	if (status === "loading") return <LoadingAutocomplete />;
	if (status === "error") return <div>{JSON.stringify(error)}</div>;

	return (
		<Autocomplete
			id="perilaku-autocomplete"
			options={data!}
			getOptionLabel={(option: Perilaku) => option.kompetensi}
			renderInput={(params) => (
				<TextField {...params} label="Search Perilaku" />
			)}
			renderOption={(props, option) => {
				return (
					<li {...props} key={option.id}>
						{option.kompetensi}
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

export default PerilakuAutocomplete;

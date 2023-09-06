import Autocomplete from "@mui/material/Autocomplete";
import { Level } from "@myTypes/entity/level";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { getLevelList } from "src/utils/master/level";
import LoadingAutocomplete from "./loading";
const TextField = dynamic(() => import("@mui/material/TextField"));

type LevelAutocompleteProps = {
	search: Level | null;
	setSearchValue: (value: Level | null) => void;
	required?: boolean;
	variant?: "standard" | "filled" | "outlined";
	size?: "small" | "medium";
};

const LevelAutocomplete = (props: LevelAutocompleteProps) => {
	const { search, setSearchValue, required, size } = props;
	const queryKey = "level.autocomplete";
	const { status, error, data } = useQuery({
		queryKey: [queryKey],
		queryFn: getLevelList,
	});
	if (status === "loading") return <LoadingAutocomplete />;
	if (status === "error") return <div>{JSON.stringify(error)}</div>;

	return (
		<Autocomplete
			id="level-autocomplete"
			options={data!}
			getOptionLabel={(option: Level) => option.level}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Search Level"
					required={required}
				/>
			)}
			renderOption={(props, option) => {
				return (
					<li {...props} key={option.id}>
						{option.level}
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

export default LevelAutocomplete;

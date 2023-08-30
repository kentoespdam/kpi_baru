import { Satuan } from "@myTypes/entity/satuan";
import { AutoCompleteProps } from "@myTypes/index";
import { useQuery } from "@tanstack/react-query";
import { getList } from "@utils/master/satuan";
import LoadingAutocomplete from "./loading";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const SatuanAutocomplete = (props: AutoCompleteProps<Satuan>) => {
	const { search, setSearchValue, required, variant, size } = props;

	const { isFetching, isLoading, error, data } = useQuery({
		queryKey: ["satuan.autocomplete"],
		queryFn: getList,
	});

	if (isLoading || isFetching) return <LoadingAutocomplete />;
	if (error) return <>{JSON.stringify(error)}</>;

	return (
		<Autocomplete
			id="satuan-autocomplete"
			options={data!}
			getOptionLabel={(option: Satuan) => option.satuan}
			renderOption={(props, option: Satuan) => (
				<li {...props} key={option.id}>
					{option.satuan}
				</li>
			)}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Search Satuan"
					required={required}
				/>
			)}
			value={search ?? null}
			onChange={(e, v) => {
				setSearchValue(v);
			}}
			isOptionEqualToValue={(option, value) =>
				option.satuan === value.satuan
			}
			aria-required={required}
			sx={{ minWidth: 200 }}
			size={size}
		/>
	);
};

export default SatuanAutocomplete;

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Satuan } from "@myTypes/entity/satuan";
import { AutoCompleteProps } from "@myTypes/index";
import { useQuery } from "@tanstack/react-query";
import { getList } from "@utils/master/satuan";
import { useState } from "react";
import LoadingAutocomplete from "./loading";

const findCurrentSatuan = (
	satuans: Satuan[],
	satuanValue: string | null | undefined
) => {
	return satuans.filter((satuan) => satuan.satuan === satuanValue)[0];
};

interface SatuanAutocompleteProps extends AutoCompleteProps<Satuan> {
	satuanValue?: string | null;
}

const SatuanAutocomplete = (props: SatuanAutocompleteProps) => {
	const { search, setSearchValue, required, size, satuanValue } = props;
	const [currentSatuan, setCurrentSatuan] = useState<Satuan | null>(search);

	const { isFetching, isLoading, error, data } = useQuery({
		queryKey: ["satuan.autocomplete"],
		queryFn: async () => {
			const result = await getList();
			const currSat = findCurrentSatuan(result, satuanValue);
			setCurrentSatuan(currSat);
			setSearchValue(currSat);
			return result;
		},
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
			value={currentSatuan}
			onChange={(e, v) => {
				setSearchValue(v);
			}}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			aria-required={required}
			sx={{ minWidth: 200 }}
			size={size}
		/>
	);
};

export default SatuanAutocomplete;

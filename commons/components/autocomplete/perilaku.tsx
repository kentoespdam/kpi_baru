import React from "react";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import LoadingAutocomplete from "./loading.autocomplete";
import useAsync from "@helpers/useAsync";
import { IPerilaku } from "@interfaces/IPerilaku";
import { getPerilaku } from "@utils/get.perilaku";

type PerilakuAutocompleteComponentProps = {
	search?: IPerilaku | null;
	setSearchValue: (value?: IPerilaku | null) => void;
};
const PerilakuAutocompleteComponent = (
	props: PerilakuAutocompleteComponentProps
) => {
	const { search, setSearchValue } = props;
	const { status, value, error } = useAsync(getPerilaku);
	if (status === "idle") return null;
	if (status === "pending") return <LoadingAutocomplete />;
	if (status === "error") return <div>{JSON.stringify(error)}</div>;

	return (
		<Autocomplete
			options={value.data}
			getOptionLabel={(option: IPerilaku) => `${option.kompetensi}`}
			renderInput={(params) => <TextField {...params} label="Perilaku" />}
			value={search ? search : null}
			onChange={(e, v) => {
				setSearchValue(v);
			}}
		/>
	);
};

export default PerilakuAutocompleteComponent;

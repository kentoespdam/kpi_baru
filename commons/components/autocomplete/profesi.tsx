import useAsync from "@helpers/useAsync";
import { IProfesi } from "@interfaces/IProfesi";
import { getProfesi } from "@utils/get.profesi";
import LoadingAutocomplete from "./loading.autocomplete";
import React from "react";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

type ProfesiAutoCompleteComponentProps = {
	search?: IProfesi | null;
	setSearchValue: (value?: IProfesi | null) => void;
};
const ProfesiAutoCompleteComponent = (
	props: ProfesiAutoCompleteComponentProps
) => {
	const { search, setSearchValue } = props;
	const { status, value, error } = useAsync(getProfesi);
	if (status === "idle") return null;
	if (status === "pending") return <LoadingAutocomplete />;
	if (status === "error") return <div>{JSON.stringify(error)}</div>;

	return (
		<Autocomplete
			options={value.data}
			getOptionLabel={(option: IProfesi) => option.name}
			renderInput={(params) => <TextField {...params} label="Profesi" />}
			value={search ? search : null}
			onChange={(e, v) => {
				setSearchValue(v);
			}}
		/>
	);
};

export default ProfesiAutoCompleteComponent;

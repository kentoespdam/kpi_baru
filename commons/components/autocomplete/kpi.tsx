import React from "react";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { IKpi } from "@interfaces/IKpi";
import { getKpi } from "@utils/get.kpi";
import LoadingAutocomplete from "./loading.autocomplete";
import useAsync from "@helpers/useAsync";

type KpiAutocompleteComponentProps = {
	search?: IKpi | null;
	setSearchValue: (value?: IKpi | null) => void;
};
const KpiAutocompleteComponent = (props: KpiAutocompleteComponentProps) => {
	const { search, setSearchValue } = props;
	const { status, value, error } = useAsync(getKpi);
	if (status === "idle") return null;
	if (status === "pending") return <LoadingAutocomplete />;
	if (status === "error") return <div>{JSON.stringify(error)}</div>;

	return (
		<Autocomplete
			options={value.data}
			getOptionLabel={(option: IKpi) => `${option.name}`}
			renderInput={(params) => <TextField {...params} label="KPI" />}
			value={search ? search : null}
			onChange={(e, v) => {
				setSearchValue(v);
			}}
		/>
	);
};

export default KpiAutocompleteComponent;

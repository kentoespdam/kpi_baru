import React from "react";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { IGrade } from "@interfaces/IGrade";
import { getGrade } from "@utils/get.grade";
import LoadingAutocomplete from "./loading.autocomplete";
import useAsync from "@helpers/useAsync";

type GradeAutocompleteComponentProps = {
	search?: IGrade | null;
	setSearchValue: (value?: IGrade | null) => void;
};
const GradeAutocompleteComponent = (props: GradeAutocompleteComponentProps) => {
	const { search, setSearchValue } = props;
	const { status, value, error } = useAsync(getGrade);
	if (status === "idle") return null;
	if (status === "pending") return <LoadingAutocomplete />;
	if (status === "error") return <div>{JSON.stringify(error)}</div>;

	return (
		<Autocomplete
			options={value.data.content}
			getOptionLabel={(option: IGrade) =>
				`${option.level.level} - GRADE ${option.grade}`
			}
			renderInput={(params) => <TextField {...params} label="Grade" />}
			value={search ? search : null}
			onChange={(e, v) => {
				setSearchValue(v);
			}}
		/>
	);
};

export default GradeAutocompleteComponent;

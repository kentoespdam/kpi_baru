import useAsync from "@helpers/useAsync";
import { IPosition } from "@interfaces/IPosition";
import Autocomplete from "@mui/material/Autocomplete";
import { getPosition } from "@utils/get.position";
import LoadingAutocomplete from "./loading.autocomplete";
import TextField from "@mui/material/TextField";

type PositionAutoCompleteProps = {
	search?: IPosition | null;
	setSearchValue: (value?: IPosition | null) => void;
};

const PositionAutocompleteComponent = (props: PositionAutoCompleteProps) => {
	const { search, setSearchValue } = props;
	const { status, value, error } = useAsync(getPosition);
	if (status === "idle") return null;
	if (status === "pending") return <LoadingAutocomplete />;
	if (status === "error") return <div>{JSON.stringify(error)}</div>;
	return (
		<Autocomplete
			options={value.data}
			getOptionLabel={(option: IPosition) => option.name}
			renderInput={(params) => <TextField {...params} label="Position" />}
			value={search ? search : null}
			onChange={(e, v) => {
				setSearchValue(v);
			}}
		/>
	);
};

export default PositionAutocompleteComponent;

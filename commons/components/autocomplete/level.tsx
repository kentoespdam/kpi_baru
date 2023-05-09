import useAsync from "@commons/helpers/useAsync";
import { ILevel } from "@commons/interfaces/ILevel";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { fetchLevelList } from "@storage/master/level.store";
import LoadingAutocomplete from "./loading.autocomplete";

type LevelAutocompleteComponentProps = {
	search?: ILevel | null;
	setSearchValue: (value?: ILevel | null) => void;
};

const LevelAutocompleteComponent = (props: LevelAutocompleteComponentProps) => {
	const { search, setSearchValue } = props;
	const { status, value, error } = useAsync(async () => fetchLevelList(), []);
	if (status === "idle") return null;
	if (status === "pending") return <LoadingAutocomplete />;
	if (status === "error") return <div>{JSON.stringify(error)}</div>;
	return (
		<Autocomplete
			options={value}
			getOptionLabel={(option: ILevel) => option.level}
			renderInput={(params) => <TextField {...params} label="Level" />}
			value={search ?? null}
			onChange={(e, v) => {
				setSearchValue(v);
			}}
		/>
	);
};

export default LevelAutocompleteComponent;

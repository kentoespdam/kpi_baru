import useAsync from "@helpers/useAsync";
import { IIndikator } from "@interfaces/IIndikator";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { getIndikator } from "@utils/get.indikator";
import LoadingAutocomplete from "./loading.autocomplete";

type IndikatorAutocompleteProps = {
	search?: IIndikator | null;
	setSearchValue: (value?: IIndikator | null) => void;
	kpiId: number;
};

const IndikatorAutocompleteComponent = (props: IndikatorAutocompleteProps) => {
	const { search, setSearchValue, kpiId } = props;

	const { status, value, error } = useAsync(
		() => getIndikator(kpiId),
		[kpiId]
	);
	if (status === "idle") return null;
	if (status === "pending") return <LoadingAutocomplete />;
	if (status === "error")
		return (
			<FormControl fullWidth color="error">
				<TextField
					label="Indikator"
					value="Pilih KPI terlebih dahulu"
					color="error"
					aria-readonly
					autoFocus
				/>
			</FormControl>
		);

	return (
		<Autocomplete
			options={value.data}
			getOptionLabel={(option: IIndikator) => `${option.indikator}`}
			renderInput={(params) => (
				<TextField {...params} label="Indikator" />
			)}
			value={search ? search : null}
			onChange={(e, v) => setSearchValue(v)}
		/>
	);
};

export default IndikatorAutocompleteComponent;

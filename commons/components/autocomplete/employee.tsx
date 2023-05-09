import useAsync from "@helpers/useAsync";
import { IEmployee } from "@interfaces/IEmployee";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { getEmployee } from "@utils/get.employee";
import LoadingAutocomplete from "./loading.autocomplete";

type EmployeeAutocompleteComponentProps = {
	search?: IEmployee | null;
	setSearchValue: (value?: IEmployee | null) => void;
	orgCode?: string;
};
const EmployeeAutocompleteComponent = (
	props: EmployeeAutocompleteComponentProps
) => {
	const { search, setSearchValue, orgCode } = props;
	const { status, value, error } = useAsync(
		() => getEmployee(orgCode),
		[orgCode]
	);
	if (status === "idle") return null;
	if (status === "pending") return <LoadingAutocomplete />;
	if (status === "error")
		return (
			<FormControl fullWidth color="error">
				<TextField
					label="Employee"
					value="Pilih Organization terlebih dahulu"
					color="error"
					aria-readonly
					autoFocus
				/>
			</FormControl>
		);

	return (
		<Autocomplete
			options={value.data}
			getOptionLabel={(option: IEmployee) => `${option.nama}`}
			renderInput={(params) => <TextField {...params} label="Employee" />}
			value={search ? search : null}
			onChange={(e, v) => {
				setSearchValue(v);
			}}
		/>
	);
};

export default EmployeeAutocompleteComponent;

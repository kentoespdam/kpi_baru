import useAsync from "@helpers/useAsync";
import { IOrganization } from "@interfaces/IOrganization";
import Autocomplete from "@mui/material/Autocomplete";
import { getOrganization } from "@utils/get.organization";
import LoadingAutocomplete from "./loading.autocomplete";
import { TextField } from "@mui/material";

type OrganizationAutocompleteProps = {
	search?: IOrganization | null;
	setSearchValue: (value?: IOrganization | null) => void;
};

const OrganizationAutocompleteComponent = (
	props: OrganizationAutocompleteProps
) => {
	const { search, setSearchValue } = props;
	const { status, value, error } = useAsync(getOrganization);
	if (status === "idle") return null;
	if (status === "pending") return <LoadingAutocomplete />;
	if (status === "error") return <div>{JSON.stringify(error)}</div>;

	return (
		<Autocomplete
			options={value.data}
			getOptionLabel={(option: IOrganization) => option.name}
			renderInput={(params) => (
				<TextField {...params} label="Organization" />
			)}
			value={search ? search : null}
			onChange={(e, v) => {
				setSearchValue(v);
			}}
		/>
	);
};

export default OrganizationAutocompleteComponent;

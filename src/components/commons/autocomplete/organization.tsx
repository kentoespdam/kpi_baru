import Autocomplete from "@mui/material/Autocomplete";
import { Organization } from "@myTypes/entity/organization";
import { useQuery } from "@tanstack/react-query";
import { getList } from "@utils/eo/organization";
import LoadingAutocomplete from "./loading";
import TextField from "@mui/material/TextField";

type OrganizationAutcompleteProps = {
	search: Organization | null;
	setSearchValue: (value: Organization | null) => void;
	required?: boolean;
	variant?: "standard" | "filled" | "outlined";
	size?: "small" | "medium";
};
const OrganizationAutcomplete = (props: OrganizationAutcompleteProps) => {
	const { search, setSearchValue, required, variant, size } = props;
	const { status, error, data } = useQuery({
		queryKey: ["organization.autocomplete"],
		queryFn: getList,
	});

	if (status === "loading") return <LoadingAutocomplete />;
	if (status === "error") return <div>{JSON.stringify(error)}</div>;
	return (
		<Autocomplete
			options={data!}
			getOptionLabel={(option: Organization) => option.name}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Search Organization"
					variant={variant}
					required={required}
				/>
			)}
			renderOption={(props, option) => {
				return (
					<li {...props} key={option.id}>
						{option.name}
					</li>
				);
			}}
			value={search ?? null}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			onChange={(e, v) => {
				setSearchValue(v);
			}}
			aria-required={required}
			sx={{ minWidth: 200 }}
			size={size}
		/>
	);
};

export default OrganizationAutcomplete;

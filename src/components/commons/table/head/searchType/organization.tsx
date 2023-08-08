import OrganizationAutcomplete from "@autocomplete/organization";
import { Organization } from "@myTypes/entity/organization";
import { useState } from "react";
import { SearchTypeProps } from ".";

const SearchTypeOrganization = (props: SearchTypeProps) => {
	const { field, handleSearch, organization } = props;
	const [search, setSearchValue] = useState<Organization | null>(
		organization ? organization : null
	);

	const handleChange = async (value: Organization | null) => {
		setSearchValue(value);
		handleSearch(field, value);
	};

	return (
		<OrganizationAutcomplete
			search={search}
			setSearchValue={handleChange}
			required
			variant="outlined"
			size="small"
		/>
	);
};

export default SearchTypeOrganization;

import { IOrganization } from "@interfaces/IOrganization";
import { IFilterComponentProps } from "./filter.dialog";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import OrganizationAutocompleteComponent from "../autocomplete/organization";

const FilterOrganizationComponent = (props: IFilterComponentProps) => {
	const { searchValue, setSearchValue, addFilterHandler } = props;
	const organization = searchValue as IOrganization | null | undefined;

	return (
		<Stack direction="row" spacing={2}>
			<FormControl fullWidth>
				<OrganizationAutocompleteComponent
					search={organization}
					setSearchValue={setSearchValue}
				/>
			</FormControl>
			<Tooltip title="Add Filter Organization">
				<IconButton color="primary" onClick={addFilterHandler}>
					<AddOutlinedIcon />
				</IconButton>
			</Tooltip>
		</Stack>
	);
};

export default FilterOrganizationComponent;

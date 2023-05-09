import { IPerilaku } from "@interfaces/IPerilaku";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import PerilakuAutocompleteComponent from "../autocomplete/perilaku";
import { IFilterComponentProps } from "./filter.dialog";

const FilterPerilakuComponent = (props: IFilterComponentProps) => {
	const { searchValue, setSearchValue, addFilterHandler } = props;
	const perilaku = searchValue as IPerilaku | null | undefined;

	return (
		<Stack direction="row" spacing={2}>
			<FormControl fullWidth>
				<PerilakuAutocompleteComponent
					search={perilaku}
					setSearchValue={setSearchValue}
				/>
			</FormControl>
			<Tooltip title="Add Filter">
				<IconButton color="primary" onClick={addFilterHandler}>
					<AddOutlinedIcon />
				</IconButton>
			</Tooltip>
		</Stack>
	);
};

export default FilterPerilakuComponent;

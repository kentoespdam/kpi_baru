import FormControl from "@mui/material/FormControl";
import { IFilterComponentProps } from "./filter.dialog";
import { ILevel } from "@commons/interfaces/ILevel";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Stack from "@mui/material/Stack";
import LevelAutocompleteComponent from "../autocomplete/level";

const FilterLevelComponent = (props: IFilterComponentProps) => {
	const { searchValue, setSearchValue, addFilterHandler } = props;
	const level = searchValue as ILevel | null | undefined;

	return (
		<Stack direction="row" spacing={2}>
			<FormControl fullWidth>
				<LevelAutocompleteComponent
					search={level}
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

export default FilterLevelComponent;

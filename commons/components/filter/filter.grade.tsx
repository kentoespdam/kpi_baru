import { IGrade } from "@interfaces/IGrade";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import GradeAutocompleteComponent from "../autocomplete/grade";
import { IFilterComponentProps } from "./filter.dialog";

const FilterGradeComponent = (props: IFilterComponentProps) => {
	const { searchValue, setSearchValue, addFilterHandler } = props;
	const grade = searchValue as IGrade | null | undefined;

	return (
		<Stack direction="row" spacing={2}>
			<FormControl fullWidth>
				<GradeAutocompleteComponent
					search={grade}
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

export default FilterGradeComponent;

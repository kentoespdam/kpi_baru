import React from "react";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { IFilterComponentProps } from "./filter.dialog";
import { IPosition } from "@interfaces/IPosition";
import PositionAutocompleteComponent from "../autocomplete/position";

const FilterPositionComponent = (props: IFilterComponentProps) => {
	const { searchValue, setSearchValue, addFilterHandler } = props;
	const position = searchValue as IPosition | null | undefined;

	return (
		<Stack direction="row" spacing={2}>
			<FormControl fullWidth>
				<PositionAutocompleteComponent
					search={position}
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

export default FilterPositionComponent;

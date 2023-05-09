import React from "react";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { IFilterComponentProps } from "./filter.dialog";
import ProfesiAutocompleteComponent from "../autocomplete/profesi";
import { IProfesi } from "@interfaces/IProfesi";

const FilterProfesiComponent = (props: IFilterComponentProps) => {
	const { searchValue, setSearchValue, addFilterHandler } = props;
	const profesi = searchValue as IProfesi | null | undefined;

	return (
		<Stack direction="row" spacing={2}>
			<FormControl fullWidth>
				<ProfesiAutocompleteComponent
					search={profesi}
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

export default FilterProfesiComponent;

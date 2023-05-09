import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { IFilterComponentProps } from "./filter.dialog";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const FilterAuditStatusComponent = (props: IFilterComponentProps) => {
	const { searchValue, setSearchValue, addFilterHandler } = props;
	const [value, setValue] = React.useState(searchValue);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
		setValue(event.target.value);
	};

	return (
		<FormControl fullWidth variant="outlined" sx={{ ml: 2 }}>
			<FormLabel id="eAuditStatus-label">Status</FormLabel>
			<RadioGroup
				row
				aria-labelledby="eAuditStatus-label"
				name="eAuditStatus"
				onChange={handleChange}
				value={value}
			>
				<FormControlLabel
					value="Enabled"
					control={<Radio size="small" />}
					label="Enabled"
				/>{" "}
				<FormControlLabel
					value="Disabled"
					control={<Radio size="small" />}
					label="Disabled"
				/>
				<FormLabel sx={{ ml: 2 }} onClick={addFilterHandler}>
					<Tooltip title="Add Filter">
						<IconButton
							color="primary"
							aria-labelledby="searchInput"
						>
							<AddOutlinedIcon />
						</IconButton>
					</Tooltip>
				</FormLabel>
			</RadioGroup>
		</FormControl>
	);
};

export default FilterAuditStatusComponent;

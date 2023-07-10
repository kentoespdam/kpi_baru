import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React from "react";
import { SearchTypeProps } from ".";

const SearchTypeAuditStatus = (props: SearchTypeProps) => {
	const { field, handleSearch } = props;
	const [value, setValue] = React.useState("Enabled");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const val = (event.target as HTMLInputElement).value;
		setValue(val);
		handleSearch(field, val);
	};

	return (
		<FormControl>
			<FormLabel id="auditStatus">Status</FormLabel>
			<RadioGroup
				row
				aria-labelledby="auditStatus"
				value={value}
				onChange={handleChange}
			>
				<FormControlLabel
					value="Enabled"
					control={<Radio />}
					label="Enabled"
				/>
				<FormControlLabel
					value="Disabled"
					control={<Radio />}
					label="Disabled"
				/>
			</RadioGroup>
		</FormControl>
	);
};

export default SearchTypeAuditStatus;

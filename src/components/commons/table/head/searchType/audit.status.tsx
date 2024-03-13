import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { AUDIT_STATUS } from "@myTypes/index";
import React from "react";
import { SearchTypeProps } from ".";

const SearchTypeAuditStatus = (props: SearchTypeProps) => {
	const { field, handleSearch, status } = props;
	const [value, setValue] = React.useState(
		status === AUDIT_STATUS.DISABLED ? "Disabled" : "Enabled"
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const val = (event.target as HTMLInputElement).value;
		setValue(val);
		handleSearch(field, val);
	};

	return (
		<FormControl>
			<RadioGroup
				row
				aria-labelledby="auditStatus"
				value={value}
				onChange={handleChange}
			>
				<FormControlLabel
					value="Enabled"
					control={<Radio size="small" sx={{ padding: "4px" }} />}
					label="Enabled"
				/>
				<FormControlLabel
					value="Disabled"
					control={<Radio size="small" sx={{ padding: "4px" }} />}
					label="Disabled"
				/>
			</RadioGroup>
		</FormControl>
	);
};

export default SearchTypeAuditStatus;

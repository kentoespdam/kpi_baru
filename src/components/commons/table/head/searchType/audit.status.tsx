import React from "react";
import { SearchTypeProps } from ".";
import { AUDIT_STATUS } from "@myTypes/index";
import dynamic from "next/dynamic";
const FormControl = dynamic(() => import("@mui/material/FormControl"));
const FormControlLabel = dynamic(
	() => import("@mui/material/FormControlLabel")
);
const Radio = dynamic(() => import("@mui/material/Radio"));
const RadioGroup = dynamic(() => import("@mui/material/RadioGroup"));

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

import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import { AUDIT_STATUS } from "@myTypes/index";
import { useIndikatorStore } from "@store/filter/master/indikator";
import { useState } from "react";
import { shallow } from "zustand/shallow";

const IndikatorFilter = () => {
	const { pageRequest, sortRequest, kpiId, indikator, status, setKeyVal } =
		useIndikatorStore();

	const [checked, setChecked] = useState(
		status === AUDIT_STATUS.DISABLED ? false : true
	);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
		setKeyVal(
			"status",
			event.target.checked ? AUDIT_STATUS.ENABLED : AUDIT_STATUS.DISABLED
		);
	};

	return (
		<fieldset
			style={{
				border: "1px solid #ccc",
				borderRadius: "5px",
				marginBottom: "4px",
			}}
		>
			<legend>Filter Indikator</legend>

			<Stack direction={"row"} spacing={2} sx={{ width: "100%" }}>
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								checked={checked}
								onChange={handleChange}
								name="status"
								color="primary"
								inputProps={{
									"aria-label": "primary checkbox",
								}}
							/>
						}
						label={`Status ${checked ? "Enabled" : "Disabled"}`}
					/>
				</FormGroup>
			</Stack>
		</fieldset>
	);
};

export default IndikatorFilter;
"use client";

import EnterOutlined from "@ant-design/icons/EnterOutlined";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import { AUDIT_STATUS } from "@myTypes/index";
import { useKpiStore } from "@store/filter/master/kpi";
import { useRef, useState } from "react";

const KpiFilter = () => {
	const {
		pageRequest,
		setPageRequest,
		setKeyVal,
		status,
		organization,
		position,
		profesi,
		name,
		grade,
	} = useKpiStore();
	const field = "kpi";
	const title = "KPI Name";
	const nameRef = useRef<HTMLInputElement>(null);
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
	const enterHandler = (
		e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (e.key === "Enter") {
			setKeyVal("name", e.currentTarget.value);
		}
	};
	const searchNameClick = () => {
		if (nameRef.current === null) return;
		if (nameRef.current.value === "") setKeyVal("name", null);
		else setKeyVal("name", nameRef.current.value);
	};

	return (
		<fieldset
			style={{
				border: "1px solid #ccc",
				borderRadius: "5px",
				marginBottom: "4px",
			}}
		>
			<legend>Filter</legend>

			<Stack direction={"row"} spacing={2} sx={{ width: "100%" }}>
				<FormControl variant="outlined">
					<InputLabel
						htmlFor={`standard-adornment-search-${field}`}
					>{`Search ${title}`}</InputLabel>
					<OutlinedInput
						id={`standard-adornment-search-${field}`}
						inputRef={nameRef}
						type={"search"}
						onKeyUp={enterHandler}
						onChange={(e) => {
							if (e.target.value === "") setKeyVal("name", null);
						}}
						endAdornment={
							<Tooltip title="Press Enter for search">
								<InputAdornment
									position="end"
									onClick={searchNameClick}
								>
									<IconButton size="small">
										<EnterOutlined />
									</IconButton>
								</InputAdornment>
							</Tooltip>
						}
						defaultValue={name}
					/>
				</FormControl>
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

export default KpiFilter;

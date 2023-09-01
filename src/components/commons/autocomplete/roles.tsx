"use client";

import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { roles } from "@myTypes/index";
import { SyntheticEvent, useState } from "react";

type RolesAutocompleProps = {
	search: string[];
	setSearchValue: (value: string[]) => void;
	required?: boolean;
	variant?: "standard" | "filled" | "outlined";
	size?: "small" | "medium";
};

const RolesAutocomple = (props: RolesAutocompleProps) => {
	const { search, setSearchValue, required, variant, size } = props;
	const [curRoles, setCurRoles] = useState<string[]>(search);

	const handleChange = (e: SyntheticEvent<Element, Event>, v: string[]) => {
		setCurRoles(v);
		setSearchValue(v);
	};

	return (
		<Autocomplete
			multiple
			id="roles"
			options={roles}
			renderInput={(params) => (
				<TextField {...params} label="Search Roles" variant={variant} />
			)}
			renderOption={(props, option) => {
				return (
					<li {...props} key={option}>
						{option}
					</li>
				);
			}}
			renderTags={(value: readonly string[], getTagProps) =>
				value.map((option: string, index: number) => (
					<Chip
						key={index}
						variant="outlined"
						label={option}
						onDelete={getTagProps({ index }).onDelete}
					/>
				))
			}
			value={search}
			onChange={handleChange}
			aria-required={required}
			sx={{ minWidth: 200 }}
			size={size}
		/>
	);
};

export default RolesAutocomple;

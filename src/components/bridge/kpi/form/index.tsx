"use client";

import EmployeeAutocomplete from "@components/commons/autocomplete/employee";
import OrganizationAutcomplete from "@components/commons/autocomplete/organization";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import { Employee } from "@myTypes/entity/employee";
import { Organization } from "@myTypes/entity/organization";
import React from "react";

type BridgeKpiFormProps = {
	id?: number;
};
const BridgeKpiForm = (props: BridgeKpiFormProps) => {
	const { id } = props;
	const [org, setOrg] = React.useState<Organization | null>(null);
	const [emp, setEmp] = React.useState<Employee | null>(null);

	const setSearchOrganization = (value: Organization | null) => setOrg(value);
	const setSearchEmployee = (value: Employee | null) => setEmp(value);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};
	return (
		<Stack
			spacing={2}
			sx={{ mt: 1 }}
			component="form"
			onSubmit={handleSubmit}
		>
			<FormControl variant="standard" fullWidth>
				<OrganizationAutcomplete
					search={org}
					setSearchValue={setSearchOrganization}
				/>
			</FormControl>
			<FormControl variant="standard" fullWidth>
				<EmployeeAutocomplete
					search={emp}
					setSearchValue={setSearchEmployee}
					orgCode={org?.code}
				/>
			</FormControl>
			<FormControl variant="standard" fullWidth></FormControl>
		</Stack>
	);
};

export default BridgeKpiForm;

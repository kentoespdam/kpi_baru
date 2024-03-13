"use client";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Employee } from "@myTypes/entity/employee";
import { useQuery } from "@tanstack/react-query";
import { getList } from "@utils/eo/employee";
import { useRef, useState } from "react";
import LoadingAutocomplete from "./loading";

type EmployeeAutocompleteProps = {
	search: Employee | null;
	setSearchValue: (value: Employee | null) => void;
	label?: string;
	variant?: "standard" | "filled" | "outlined";
	required?: boolean;
	nipam?: string;
	orgCode?: string;
};
const EmployeeAutocomplete = (props: EmployeeAutocompleteProps) => {
	const { search, setSearchValue, label, variant, required, nipam, orgCode } =
		props;
	const autoRef = useRef(null);
	const [val, setVal] = useState<Employee | null>(null);

	const { isFetching, error, data } = useQuery({
		queryKey: ["employee", { orgCode }],
		queryFn: async ({ queryKey }) => {
			const result = await getList(queryKey);
			const curEmp = search
				? search
				: nipam
				? result.find((e: Employee) => e.nipam === nipam)
				: null;
			setVal(curEmp);
			setSearchValue(curEmp);
			return result;
		},
		enabled: !!orgCode,
	});

	if (isFetching) return <LoadingAutocomplete />;
	if (error || orgCode === undefined)
		return <TextField value="Pilih Organization!" error disabled />;

	return (
		<Autocomplete
			id="employee-autocomplete"
			options={data!}
			getOptionLabel={(option: Employee) => option.nama}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label ?? "Search Employee"}
					variant={variant}
					required={required}
				/>
			)}
			renderOption={(props, option) => {
				return (
					<li {...props} key={option.id}>
						{option.nama}
					</li>
				);
			}}
			defaultValue={val}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			onChange={(e, v) => {
				setSearchValue(v);
			}}
			aria-required={required}
			ref={autoRef}
		/>
	);
};

export default EmployeeAutocomplete;

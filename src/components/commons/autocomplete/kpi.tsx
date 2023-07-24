import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Kpi } from "@myTypes/entity/kpi";
import { useQuery } from "@tanstack/react-query";
import { getList } from "@utils/master/kpi";
import { useState } from "react";
import LoadingAutocomplete from "./loading";

type KpiAutocompleteProps = {
	search: Kpi | null;
	setSearchValue: (value: Kpi | null) => void;
	required?: boolean;
	variant?: "standard" | "filled" | "outlined";
	size?: "small" | "medium";
	label?: string;
	kpiId?: number | null;
};

const KpiAutocomplete = (props: KpiAutocompleteProps) => {
	const { search, setSearchValue, required, variant, label, size, kpiId } =
		props;

	const [curKpi, setCurKpi] = useState<Kpi | null>(null);

	const { status, error, data } = useQuery({
		queryKey: ["kpi.autocomplete"],
		queryFn: async () => {
			const result = await getList();
			const kpiini = search
				? search
				: result.find((item: Kpi) => item.id === Number(kpiId));
			console.log(kpiini);
			setCurKpi(kpiini);
			setSearchValue(kpiini);
			return result;
		},
	});

	if (status === "loading") return <LoadingAutocomplete />;
	if (status === "error") return <div>{JSON.stringify(error)}</div>;

	return (
		<Autocomplete
			id="kpi-autocomplete"
			options={data!}
			getOptionLabel={(option: Kpi) => option.name}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label ?? "Search KPI"}
					variant={variant ?? "standard"}
				/>
			)}
			renderOption={(props, option) => {
				return (
					<li {...props} key={option.id}>
						{option.name}
					</li>
				);
			}}
			value={curKpi}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			onChange={(e, v) => {
				setSearchValue(v);
			}}
			aria-required={required}
			size={size}
		/>
	);
};

export default KpiAutocomplete;

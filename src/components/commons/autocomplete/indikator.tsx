import Autocomplete from "@mui/material/Autocomplete";
import { Indikator } from "@myTypes/entity/indikator";
import { useQuery } from "@tanstack/react-query";
import { getList } from "@utils/master/indikator";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import LoadingAutocomplete from "./loading";

const TextField = dynamic(() => import("@mui/material/TextField"));

type IndikatorAutocompleteProps = {
	search: Indikator | null;
	setSearchValue: (value: Indikator | null) => void;
	kpiId?: number;
	indikatorId?: number;
	label?: string;
	variant?: "standard" | "filled" | "outlined";
	required?: boolean;
};

const IndikatorAutocomplete = (props: IndikatorAutocompleteProps) => {
	const {
		kpiId,
		indikatorId,
		search,
		setSearchValue,
		label,
		variant,
		required,
	} = props;
	const autoRef = useRef(null);

	const [val, setVal] = useState<Indikator | null>(null);

	const { isFetching, error, data } = useQuery({
		queryKey: ["indikator.autocomplete", kpiId],
		queryFn: async ({ queryKey }) => {
			const result = await getList(queryKey);
			const curIndikator = search
				? search
				: indikatorId
				? result.find((indikator) => indikator.id === indikatorId) ||
				  null
				: null;
			setVal(curIndikator);
			setSearchValue(curIndikator);
			return result;
		},
		enabled: !!kpiId,
	});

	if (isFetching) return <LoadingAutocomplete />;
	if (error || kpiId === undefined)
		return <TextField value="Pilih KPI!" error disabled />;

	return (
		<Autocomplete
			id="indikator-autocomplete"
			options={data!}
			getOptionLabel={(option: Indikator) => option.indikator}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label ?? "Search Indikator KPI"}
					variant={variant ?? "standard"}
				/>
			)}
			renderOption={(props, option) => {
				return (
					<li {...props} key={option.id}>
						{option.indikator}
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

export default IndikatorAutocomplete;

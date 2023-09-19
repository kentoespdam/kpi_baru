import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { BridgeKpi } from "@myTypes/entity/bridge.kpi";
import { useQuery } from "@tanstack/react-query";
import { getList } from "@utils/bridge/kpi";
import { SyntheticEvent, useState } from "react";
import LoadingAutocomplete from "./loading";

type BridgeKpiAutocompleteProps = {
	search: BridgeKpi | null;
	setSearchValue: (value: BridgeKpi | null) => void;
	required?: boolean;
	variant?: "standard" | "filled" | "outlined";
	size?: "small" | "medium";
	label?: string;
};
const BridgeKpiAutocomplete = (props: BridgeKpiAutocompleteProps) => {
	const { search, setSearchValue, required, variant, label, size } = props;

	const [curKpi, setCurKpi] = useState<BridgeKpi | null>(search);

	const { status, error, data } = useQuery({
		queryKey: ["bridge-kpi.autocomplete"],
		queryFn: getList,
	});

	const handleChange = (
		e: SyntheticEvent<Element, Event>,
		v: BridgeKpi | null
	) => {
		setCurKpi(v);
		setSearchValue(v);
	};

	if (status === "loading") return <LoadingAutocomplete />;
	if (status === "error") return <div>{JSON.stringify(error)}</div>;

	return (
		<Autocomplete
			id="bridge-kpi-autocomplete"
			options={data!}
			getOptionLabel={(option: BridgeKpi) =>
				`${option.nipam} ${option.name}`
			}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label ?? "Search Pegawai"}
					variant={variant}
					required={required}
				/>
			)}
			renderOption={(props, option) => (
				<li {...props} key={option.id}>
					{option.nipam} {option.name}
				</li>
			)}
			value={curKpi}
			onChange={handleChange}
			aria-required={required}
			size={size}
		/>
	);
};

export default BridgeKpiAutocomplete;

import { Indikator } from "@myTypes/entity/indikator";
import Autocomplete from "@mui/material/Autocomplete";
import LoadingAutocomplete from "./loading";
import TextField from "@mui/material/TextField";
import { useQuery } from "@tanstack/react-query";
import { getList } from "@utils/master/indikator";

type IndikatorAutocompleteProps = {
	kpiId: number;
	indikatorId?: number;
	search: Indikator | null;
	setSearchValue: (value: Indikator | null) => void;
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

	const { status, error, data } = useQuery({
		queryKey: ["indikator.autocomplete", kpiId],
		queryFn: async ({ queryKey }) => await getList(queryKey),
	});

	if (status === "loading") return <LoadingAutocomplete />;
	if (status === "error") return <div>{JSON.stringify(error)}</div>;

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
			value={
				search
					? search
					: indikatorId
					? data.find((item: Indikator) => item.id === indikatorId)
					: null
			}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			onChange={(e, v) => {
				setSearchValue(v);
			}}
			aria-required={required}
		/>
	);
};

export default IndikatorAutocomplete;

import { getListPeriode } from "@helper/periode";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useTransKpiStore } from "@store/filter/trans/kpi";

const PeriodeComponent = () => {
	const { periode, setPeriode } = useTransKpiStore();
	const periodeList = getListPeriode("desc");

	return (
		<FormControl variant="standard" sx={{ minWidth: 200, mb: 2 }}>
			<Autocomplete
				id="periode-autocomplete"
				options={periodeList}
				getOptionLabel={(option) => String(option.periode)}
				renderInput={(params) => (
					<TextField {...params} label="Select Periode" />
				)}
				renderOption={(props, option) => {
					return (
						<li {...props} key={option.periode}>
							{option.periode}
						</li>
					);
				}}
				value={periode ?? null}
				isOptionEqualToValue={(option, value) =>
					option.periode === value.periode
				}
				onChange={(e, v) => setPeriode(v)}
			/>
		</FormControl>
	);
};

export default PeriodeComponent;

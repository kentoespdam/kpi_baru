import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ListIcon from "@mui/icons-material/List";
import { getListPeriode } from "@helper/periode";
import { useKpiAdminStore } from "@store/filter/trans/kpi.admin";
import OrgDrawer from "./org.drawer";

const KpiAdminFilter = () => {
	const { isOrgOpen, setOrgOpen, periode, setPeriode } = useKpiAdminStore();
	const periodeList = getListPeriode("desc");
	return (
		<fieldset
			style={{
				border: "1px solid #ccc",
				borderRadius: "5px",
				marginBottom: "10px",
			}}
		>
			<legend>Filter</legend>
			<Stack direction="row" spacing={2}>
				<IconButton
					disableRipple
					edge="start"
					aria-label="List Cabang"
					color="secondary"
					onClick={() => setOrgOpen(!isOrgOpen)}
				>
					<ListIcon />
				</IconButton>
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
						value={periode}
						isOptionEqualToValue={(option, value) =>
							option.periode === value.periode
						}
						onChange={(e, v) => setPeriode(v)}
					/>
				</FormControl>

				<OrgDrawer />
			</Stack>
		</fieldset>
	);
};

export default KpiAdminFilter;

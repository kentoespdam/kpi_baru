import BridgeKpiAutocomplete from "@autocomplete/bridge.kpi";
import { getListPeriode } from "@helper/periode";
import Autocomplete from "@mui/material/Autocomplete";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { BridgeKpi } from "@myTypes/entity/bridge.kpi";
import { useKpiAdminStore } from "@store/filter/trans/kpi.admin";
import { useState } from "react";
import ListIcon from "@mui/icons-material/List";
import OrgTree from "./orgs/tree";

const KpiAdminFilter = () => {
	const { periode, setPeriode, bridgeKpi, setBridgeKpi } = useKpiAdminStore();
	const periodeList = getListPeriode("desc");
	const [isOpen, setOpen] = useState(false);

	const toggleDrawer = () => {
		setOpen(!isOpen);
	};

	const handleChangeBridgeKpi = (value: BridgeKpi | null) => {
		setBridgeKpi(value);
	};

	return (
		<fieldset
			style={{
				border: "1px solid #ccc",
				borderRadius: "5px",
				marginBottom: "10px",
				width: "100%",
			}}
		>
			<legend>Filter</legend>
			<Stack direction={"row"} spacing={2} sx={{ width: "100%" }}>
				<IconButton
					disableRipple
					edge="start"
					aria-label="List Cabang"
					color="secondary"
					onClick={toggleDrawer}
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
				<FormControl variant="standard" sx={{ minWidth: 350, mb: 2 }}>
					<BridgeKpiAutocomplete
						search={bridgeKpi}
						setSearchValue={handleChangeBridgeKpi}
					/>
				</FormControl>
			</Stack>

			<Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
				<OrgTree />
			</Drawer>
		</fieldset>
	);
};

export default KpiAdminFilter;

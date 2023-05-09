import { getListPeriode } from "@helpers/periode.helper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTransactionKpiStore } from "@storage/transaction/kpi.store";
import { useState } from "react";

const PeriodeComponent = () => {
	const { periode, setPeriode } = useTransactionKpiStore((state) => ({
		periode: state.periode,
		setPeriode: state.setPeriode,
	}));
	// const [periode, setPeriode] = useState<string>("");
	function changeHandler(e: SelectChangeEvent<string>) {
		setPeriode(e.target.value);
	}

	return (
		<FormControl variant="standard" sx={{ minWidth: 200, mb: 2 }}>
			<InputLabel id="periodeLabel" sx={{ fontWeight: "bold" }}>
				Periode
			</InputLabel>
			<Select
				labelId="periodeLabel"
				id="periode"
				value={periode ?? ""}
				onChange={changeHandler}
				label="Periode"
			>
				{getListPeriode().map((item) => (
					<MenuItem key={item.periode} value={item.periode}>
						{item.periode}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default PeriodeComponent;

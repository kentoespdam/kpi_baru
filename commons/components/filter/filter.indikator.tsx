import { IIndikator } from "@interfaces/IIndikator";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IndikatorAutocompleteComponent from "../autocomplete/indikator";
import { IFilterComponentProps } from "./filter.dialog";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useFilterDialogStore } from "@storage/filter.dialog.store";
import { shallow } from "zustand/shallow";
import TextField from "@mui/material/TextField";
import { IKpi } from "@interfaces/IKpi";

const FilterIndikatorComponent = (props: IFilterComponentProps) => {
	const { searchValue, setSearchValue, addFilterHandler } = props;
	const indikator = searchValue as IIndikator | null | undefined;
	const filterOptions = useFilterDialogStore(
		(state) => state.filterOptions,
		shallow
	);
	const kpi = filterOptions?.find((item) => item.id === "kpi")?.value as IKpi;
	if (kpi === undefined)
		return (
			<FormControl fullWidth color="error">
				<TextField
					label="Indikator"
					value="Pilih KPI terlebih dahulu"
					color="error"
					aria-readonly
					autoFocus
				/>
			</FormControl>
		);

	return (
		<Stack direction="row" spacing={2}>
			<FormControl fullWidth>
				<IndikatorAutocompleteComponent
					search={indikator}
					setSearchValue={setSearchValue}
					kpiId={kpi.id}
				/>
			</FormControl>
			<Tooltip title="Add Filter Indikator">
				<IconButton color="primary" onClick={addFilterHandler}>
					<AddOutlinedIcon />
				</IconButton>
			</Tooltip>
		</Stack>
	);
};

export default FilterIndikatorComponent;

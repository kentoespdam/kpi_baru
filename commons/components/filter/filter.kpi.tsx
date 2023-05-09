import { IKpi } from "@interfaces/IKpi";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import KpiAutocompleteComponent from "../autocomplete/kpi";
import { IFilterComponentProps } from "./filter.dialog";

const FilterKpiComponent = (props: IFilterComponentProps) => {
	const { searchValue, setSearchValue, addFilterHandler } = props;
	const kpi = searchValue as IKpi | null | undefined;
	return (
		<Stack direction="row" spacing={2}>
			<FormControl fullWidth>
				<KpiAutocompleteComponent
					search={kpi}
					setSearchValue={setSearchValue}
				/>
			</FormControl>
			<Tooltip title="Add Filter KPI">
				<IconButton color="primary" onClick={addFilterHandler}>
					<AddOutlinedIcon />
				</IconButton>
			</Tooltip>
		</Stack>
	);
};

export default FilterKpiComponent;

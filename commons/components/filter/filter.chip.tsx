import { SelectType } from "@commons/interfaces/ICommons";
import { ILevel } from "@commons/interfaces/ILevel";
import { IGrade } from "@interfaces/IGrade";
import { IIndikator } from "@interfaces/IIndikator";
import { IKpi } from "@interfaces/IKpi";
import { IOrganization } from "@interfaces/IOrganization";
import { IPerilaku } from "@interfaces/IPerilaku";
import { IPosition } from "@interfaces/IPosition";
import { IProfesi } from "@interfaces/IProfesi";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { useFilterDialogStore } from "@storage/filter.dialog.store";

type ChipComponentProps = {
	id: string;
	value: unknown;
	removeFilter: (id: string) => void;
};

const ChipComponent = (props: ChipComponentProps) => {
	const { id, value, removeFilter } = props;

	return (
		<Chip
			key={id}
			label={`${id}: ${value}`}
			variant="outlined"
			sx={{ mb: 1, mr: 1 }}
			onDelete={() => removeFilter(id)}
		/>
	);
};

export type FilterChipProps = {
	filter: Record<string, unknown>;
	selectTypes: Record<string, unknown>[];
	addFilter: (act: unknown, val: unknown) => void;
};

const FilterChip = () => {
	const { filterOptions, setFilterOptions } = useFilterDialogStore(
		(state) => ({
			filterOptions: state.filterOptions,
			setFilterOptions: state.setFilterOptions,
		})
	);

	const removeFilter = (id: string) => {
		if (filterOptions === undefined) return;
		const index = filterOptions.map((item) => item.id).indexOf(id);

		filterOptions[index].value = null;
		setFilterOptions(filterOptions!);
	};

	return (
		<Grid container component="div" sx={{ maxWidth: "100%" }}>
			{filterOptions?.map((item: SelectType) => {
				if (
					item.value === "" ||
					item.value === null ||
					item.value === undefined
				)
					return null;

				if (typeof item.value === "number" && item.value > 0)
					return (
						<ChipComponent
							key={item.id}
							id={item.id}
							value={item.value}
							removeFilter={removeFilter}
						/>
					);

				if (item.type === "level") {
					const level = item.value as ILevel;
					return (
						<ChipComponent
							key={item.id}
							id={item.id}
							value={level.level}
							removeFilter={removeFilter}
						/>
					);
				}

				if (item.type === "organization") {
					const org = item.value as IOrganization;
					return (
						<ChipComponent
							key={item.id}
							id={item.id}
							value={org.name}
							removeFilter={removeFilter}
						/>
					);
				}

				if (item.type === "position") {
					const value = item.value as IPosition;
					return (
						<ChipComponent
							key={item.id}
							id={item.id}
							value={value.name}
							removeFilter={removeFilter}
						/>
					);
				}

				if (item.type === "profesi") {
					const value = item.value as IProfesi;
					return (
						<ChipComponent
							key={item.id}
							id={item.id}
							value={value.name}
							removeFilter={removeFilter}
						/>
					);
				}

				if (item.type === "grade") {
					const value = item.value as IGrade;
					return (
						<ChipComponent
							key={item.id}
							id={item.id}
							value={`${value.level.level} Grade ${value.grade}`}
							removeFilter={removeFilter}
						/>
					);
				}

				if (item.type === "kpi") {
					const value = item.value as IKpi;
					return (
						<ChipComponent
							key={item.id}
							id={item.id}
							value={value.name}
							removeFilter={removeFilter}
						/>
					);
				}

				if (item.type === "indikator") {
					const value = item.value as IIndikator;
					return (
						<ChipComponent
							key={item.id}
							id={item.id}
							value={value.indikator}
							removeFilter={removeFilter}
						/>
					);
				}

				if (item.type === "perilaku") {
					const value = item.value as IPerilaku;
					return (
						<ChipComponent
							key={item.id}
							id={item.id}
							value={value.kompetensi}
							removeFilter={removeFilter}
						/>
					);
				}

				return (
					<ChipComponent
						key={item.id}
						id={item.id}
						value={item.value}
						removeFilter={removeFilter}
					/>
				);
			})}
		</Grid>
	);
};

export default FilterChip;

export const findAction = (key: string, arrData: Record<string, unknown>[]) => {
	const filter = arrData.filter((val) => val.id === key)[0];
	return filter.action;
};

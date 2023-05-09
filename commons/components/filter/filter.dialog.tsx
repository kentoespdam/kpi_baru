import { SelectType } from "@commons/interfaces/ICommons";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useFilterDialogStore } from "@storage/filter.dialog.store";
import React, { Dispatch, Suspense } from "react";
import { shallow } from "zustand/shallow";
import FilterChip from "./filter.chip";
import FilterAuditStatusComponent from "./filter.eauditstatus";
import FilterLevelComponent from "./filter.level";
import FilterStringComponent from "./filter.string";
import FilterOrganizationComponent from "./filter.organization";
import FilterProfesiComponent from "./filter.profesi";
import FilterGradeComponent from "./filter.grade";
import FilterPositionComponent from "./filter.position";
import FilterKpiComponent from "./filter.kpi";
import FilterIndikatorComponent from "./filter.indikator";
import FilterPerilakuComponent from "./filter.perilaku";

export type IFilterComponentProps = {
	searchValue: unknown;
	setSearchValue: (value: unknown) => void;
	addFilterHandler: () => void;
};

type IFilterValueBuilder = {
	searchValue: unknown;
	setSearchValue: Dispatch<unknown>;
	addFilterHandler: () => void;
	type: string;
};

const FilterValueBuilder = (props: IFilterValueBuilder) => {
	const { searchValue, setSearchValue, addFilterHandler, type } = props;

	if (type === null) return null;
	switch (type) {
		case "string":
			return (
				<FilterStringComponent
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					addFilterHandler={addFilterHandler}
				/>
			);
		case "eAuditStatus":
			return (
				<FilterAuditStatusComponent
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					addFilterHandler={addFilterHandler}
				/>
			);
		case "level":
			return (
				<Suspense fallback={<CircularProgress />}>
					<FilterLevelComponent
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						addFilterHandler={addFilterHandler}
					/>
				</Suspense>
			);
		case "organization":
			return (
				<Suspense fallback={<CircularProgress />}>
					<FilterOrganizationComponent
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						addFilterHandler={addFilterHandler}
					/>
				</Suspense>
			);
		case "position":
			return (
				<Suspense fallback={<CircularProgress />}>
					<FilterPositionComponent
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						addFilterHandler={addFilterHandler}
					/>
				</Suspense>
			);
		case "profesi":
			return (
				<Suspense fallback={<CircularProgress />}>
					<FilterProfesiComponent
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						addFilterHandler={addFilterHandler}
					/>
				</Suspense>
			);
		case "grade":
			return (
				<Suspense fallback={<CircularProgress />}>
					<FilterGradeComponent
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						addFilterHandler={addFilterHandler}
					/>
				</Suspense>
			);
		case "kpi":
			return (
				<Suspense fallback={<CircularProgress />}>
					<FilterKpiComponent
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						addFilterHandler={addFilterHandler}
					/>
				</Suspense>
			);
		case "indikator":
			return (
				<Suspense fallback={<CircularProgress />}>
					<FilterIndikatorComponent
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						addFilterHandler={addFilterHandler}
					/>
				</Suspense>
			);
		case "perilaku":
			return (
				<Suspense fallback={<CircularProgress />}>
					<FilterPerilakuComponent
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						addFilterHandler={addFilterHandler}
					/>
				</Suspense>
			);
		default:
			return null;
	}
};

const FilterDialog = () => {
	const { title, isOpen, filterOptions, toggleOpen, setFilterKey } =
		useFilterDialogStore(
			(state) => ({
				title: state.title,
				isOpen: state.isOpen,
				filterOptions: state.filterOptions,
				toggleOpen: state.toggleOpen,
				setFilterKey: state.setFilterKey,
			}),
			shallow
		);

	const [searchType, setSearchType] = React.useState<SelectType | null>(null);
	const [searchValue, setSearchValue] = React.useState<unknown>(null);

	const searchHandler = (value: SelectType | null) => {
		setSearchValue(null);
		setSearchType(value);
		if (value === null) setFilterKey("");
		setFilterKey(String(value?.id));
	};

	const addFilterHandler = () => {
		const index = filterOptions!
			.map((item) => item.id)
			.indexOf(String(searchType?.id));

		filterOptions![index].value = searchValue;

		setTimeout(() => {
			setSearchValue("");
			document.getElementById("searchType")?.focus();
		}, 500);
	};

	return (
		<Dialog open={isOpen} onClose={toggleOpen} maxWidth="xl" fullWidth>
			<DialogTitle>{title}</DialogTitle>
			<Divider />
			<DialogContent>
				<Grid container spacing={1}>
					<Grid item lg={4} sm={6} xs={12}>
						<Autocomplete
							id="searchType"
							options={filterOptions!}
							openOnFocus
							selectOnFocus
							onChange={(e, newValue) => {
								searchHandler(newValue);
							}}
							renderInput={(params) => (
								<TextField {...params} label="Search Type" />
							)}
						/>
					</Grid>
					<Grid item lg={8} sm={6} xs={12}>
						<FilterValueBuilder
							searchValue={searchValue}
							setSearchValue={setSearchValue}
							addFilterHandler={addFilterHandler}
							type={String(searchType?.type)}
						/>
					</Grid>
					<Grid item lg={11} xs={8}>
						<FilterChip />
					</Grid>
					<Grid item lg={1} xs={4}>
						<Button variant="outlined" onClick={toggleOpen}>
							Close
						</Button>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
};

export default FilterDialog;

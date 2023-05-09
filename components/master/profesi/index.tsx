"use client";
import AddButton from "@commons/components/button/add.button";
import { FilterToolbar } from "@commons/components/filter/filter.toolbar";
import FormDialog from "@commons/components/form.dialog";
import { filterToRequest } from "@commons/helpers/fetch.helper";
import { EAuditStatus } from "@commons/interfaces/ICommons";
import { profesiFilterType } from "@commons/interfaces/IProfesi";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useFilterDialogStore } from "@storage/filter.dialog.store";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { useProfesiStore } from "@storage/master/profesi.store";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import ProfesiForm from "./profesi.form";
import ProfesiTable from "./table";

const ProfesiComponent = () => {
	const { toggleOpen, filterOptions, setFilterOptions, setTitle } =
		useFilterDialogStore(
			(state) => ({
				toggleOpen: state.toggleOpen,
				filterOptions: state.filterOptions,
				setFilterOptions: state.setFilterOptions,
				setTitle: state.setTitle,
			}),
			shallow
		);

	const { pageRequest, setPageRequest, setAction, setForm } = useProfesiStore(
		(state) => ({
			pageRequest: state.pageRequest,
			setPageRequest: state.setPageRequest,
			setAction: state.setAction,
			setForm: state.setForm,
		}),
		shallow
	);

	const toggleDialog = useFormDialogStore(
		(state) => state.toggleDialog,
		shallow
	);

	function addHandler() {
		setForm({ status: EAuditStatus.Enabled });
		setAction("create");
		toggleDialog();
	}

	function filterHandler() {
		if (filterOptions === undefined) setFilterOptions(profesiFilterType);
		setTitle("Filter Grade");
		toggleOpen();
	}

	function findHandler() {
		if (filterOptions === undefined) {
			setPageRequest({
				page: 0,
				size: 10,
				sort: pageRequest.sort,
				direction: pageRequest.direction,
			});
			return;
		}
		const fromFilter = filterToRequest(filterOptions);
		if (fromFilter === null) {
			setPageRequest({
				page: 0,
				size: pageRequest.size,
				sort: pageRequest.sort,
				direction: pageRequest.direction,
			});
			return;
		}
		if (fromFilter.level !== undefined) {
			fromFilter.levelId = fromFilter.level?.id;
			delete fromFilter.level;
		}
		const request = {
			page: 0,
			size: pageRequest.size,
			sort: pageRequest.sort,
			direction: pageRequest.direction,
			...fromFilter,
		};
		setPageRequest(request);
	}

	useEffect(() => {
		setFilterOptions(profesiFilterType);
	}, [setFilterOptions]);

	return (
		<Grid container spacing={2} sx={{ minHeight: "90vh" }}>
			<Grid item xs={12}>
				<Paper
					elevation={5}
					sx={{ minHeight: 300, width: "100%", p: 1 }}
				>
					<FilterToolbar
						title="Master Profesi"
						filterHandler={filterHandler}
						findHandler={findHandler}
					/>
					<ProfesiTable />
				</Paper>
			</Grid>
			<FormDialog title="Add Profesi" form={<ProfesiForm />} />
			<AddButton toggleDialog={addHandler} />
		</Grid>
	);
};

export default ProfesiComponent;

"use client";
import AddButton from "@commons/components/button/add.button";
import { FilterToolbar } from "@commons/components/filter/filter.toolbar";
import FormDialog from "@commons/components/form.dialog";
import { filterToRequest } from "@commons/helpers/fetch.helper";
import { EAuditStatus } from "@commons/interfaces/ICommons";
import { indikatorFilterType } from "@commons/interfaces/IIndikator";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useFilterDialogStore } from "@storage/filter.dialog.store";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { useIndikatorStore } from "@storage/master/indikator.store";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import IndikatorForm from "./indikator.form";
import IndikatorTable from "./table";

const MasterIndikatorComponent = () => {
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

	const { pageRequest, setPageRequest, setAction, setForm } =
		useIndikatorStore(
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
		if (filterOptions === undefined) setFilterOptions(indikatorFilterType);
		setTitle("Filter Indikator");
		toggleOpen();
	}

	function findHandler() {
		let request = {
			page: 0,
			size: pageRequest.size,
		};
		if (filterOptions === undefined) {
			setPageRequest(request);
			return;
		}
		const fromFilter = filterToRequest(filterOptions);
		if (fromFilter === null) {
			setPageRequest(request);
			return;
		}

		if (fromFilter.kpi !== undefined) {
			fromFilter.kpiId = fromFilter.kpi.id;
			delete fromFilter.kpi;
		}
		request = { ...request, ...fromFilter };
		setPageRequest(request);
	}

	useEffect(() => {
		setFilterOptions(indikatorFilterType);
	}, [setFilterOptions]);

	return (
		<Grid container spacing={2} sx={{ minHeight: "90vh" }}>
			<Grid item xs={12}>
				<Paper
					elevation={5}
					sx={{ minHeight: 300, width: "100%", p: 1 }}
				>
					<FilterToolbar
						title="Master Indikator"
						filterHandler={filterHandler}
						findHandler={findHandler}
					/>
					<IndikatorTable />
				</Paper>
			</Grid>
			<FormDialog title="Add Indikator" form={<IndikatorForm />} />
			<AddButton toggleDialog={addHandler} />
		</Grid>
	);
};

export default MasterIndikatorComponent;

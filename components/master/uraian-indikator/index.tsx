"use client";
import AddButton from "@commons/components/button/add.button";
import { FilterToolbar } from "@commons/components/filter/filter.toolbar";
import FormDialog from "@commons/components/form.dialog";
import { filterToRequest } from "@commons/helpers/fetch.helper";
import { EAuditStatus } from "@commons/interfaces/ICommons";
import { uraianIndikatorFilterType } from "@interfaces/IUraianIndikator";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useFilterDialogStore } from "@storage/filter.dialog.store";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { useUraianIndikatorStore } from "@storage/master/uraian.indikator.store";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import UraianIndikatorTable from "./table";
import UraianIndikatorForm from "./uraian.indikator.form";

const UraianIndikatorComponent = () => {
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
		useUraianIndikatorStore(
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
		if (filterOptions === undefined)
			setFilterOptions(uraianIndikatorFilterType);
		setTitle("Filter Uraian Indikator");
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
			fromFilter.kpiId = fromFilter.kpi?.id;
			delete fromFilter.kpi;
		}
		if (fromFilter.indikator !== undefined) {
			fromFilter.indikatorId = fromFilter.indikator?.id;
			delete fromFilter.indikator;
		}

		request = { ...request, ...fromFilter };
		setPageRequest(request);
	}

	useEffect(() => {
		setFilterOptions(uraianIndikatorFilterType);
	}, [setFilterOptions]);

	return (
		<Grid container spacing={2} sx={{ minHeight: "90vh" }}>
			<Grid item xs={12}>
				<Paper
					elevation={5}
					sx={{ minHeight: 300, width: "100%", p: 1 }}
				>
					<FilterToolbar
						title="Master Uraian Indikator"
						filterHandler={filterHandler}
						findHandler={findHandler}
					/>
					<UraianIndikatorTable />
				</Paper>
			</Grid>
			<FormDialog
				title="Add Uraian Indikator"
				form={<UraianIndikatorForm />}
			/>
			<AddButton toggleDialog={addHandler} />
		</Grid>
	);
};

export default UraianIndikatorComponent;

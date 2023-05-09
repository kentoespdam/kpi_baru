"use client";
import AddButton from "@commons/components/button/add.button";
import { FilterToolbar } from "@commons/components/filter/filter.toolbar";
import FormDialog from "@commons/components/form.dialog";
import { filterToRequest } from "@commons/helpers/fetch.helper";
import { EAuditStatus } from "@commons/interfaces/ICommons";
import { IKpiRequest, kpiFilterType } from "@commons/interfaces/IKpi";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useFilterDialogStore } from "@storage/filter.dialog.store";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { useKpiStore } from "@storage/master/kpi.store";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import KpiForm from "./kpi.form";
import KpiTable from "./table";

const MasterKpiComponent = () => {
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

	const { pageRequest, setPageRequest, setAction, setForm } = useKpiStore(
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
		if (filterOptions === undefined) setFilterOptions(kpiFilterType);
		setTitle("Filter KPI");
		toggleOpen();
	}

	function findHandler() {
		if (filterOptions === undefined || filterOptions === null) {
			setPageRequest(pageRequest);
			return;
		}
		const fromFilter: IKpiRequest = filterToRequest(filterOptions);
		if (fromFilter === null) {
			const request = {
				page: 0,
				size: pageRequest.size,
			};
			setPageRequest(request);
			return;
		}

		if (fromFilter.organization! !== undefined) {
			fromFilter.organizationId = fromFilter.organization?.id;
			delete fromFilter.organization;
		}
		if (fromFilter.position !== undefined) {
			fromFilter.positionId = fromFilter.position.id;
			delete fromFilter.position;
		}
		if (fromFilter.profesi !== undefined) {
			fromFilter.profesiId = fromFilter.profesi.id;
			delete fromFilter.profesi;
		}
		if (fromFilter.grade !== undefined) {
			fromFilter.gradeId = fromFilter.grade.id;
			delete fromFilter.grade;
		}

		const request = {
			page: 0,
			size: pageRequest.size,
			...fromFilter,
		};
		setPageRequest(request);
	}

	useEffect(() => {
		setFilterOptions(kpiFilterType);
	}, [setFilterOptions]);

	return (
		<Grid container spacing={2} sx={{ minHeight: "90vh" }}>
			<Grid item xs={12}>
				<Paper
					elevation={5}
					sx={{ minHeight: 300, width: "100%", p: 1 }}
				>
					<FilterToolbar
						title="Master KPI"
						filterHandler={filterHandler}
						findHandler={findHandler}
					/>
					<KpiTable />
				</Paper>
			</Grid>
			<FormDialog title="Add KPI" form={<KpiForm />} />
			<AddButton toggleDialog={addHandler} />
		</Grid>
	);
};

export default MasterKpiComponent;

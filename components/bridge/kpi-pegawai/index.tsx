"use client";
import AddButton from "@commons/components/button/add.button";
import { FilterToolbar } from "@commons/components/filter/filter.toolbar";
import { filterToRequest } from "@helpers/fetch.helper";
import {
	bridgeKpiPegawaiFilterType,
	IBridgeKpiPegawaiRequest,
} from "@interfaces/IBridgeKpiPegawai";
import { EAuditStatus } from "@interfaces/ICommons";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useBridgeKpiPegawaiStore } from "@storage/bridge/kpi-pegawai.store";
import { useFilterDialogStore } from "@storage/filter.dialog.store";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { lazy, useEffect } from "react";
import { shallow } from "zustand/shallow";
import KpiPegawaiTable from "./table";

const FormDialog = lazy(() => import("@commons/components/form.dialog"));
const KpiPegawaiForm = lazy(() => import("./form"));

const BridgeKpiPegawaiComponent = () => {
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
		useBridgeKpiPegawaiStore(
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
			setFilterOptions(bridgeKpiPegawaiFilterType);
		setTitle("Filter Bridge KPI Pegawai");
		toggleOpen();
	}

	function findHandler() {
		let request = {
			page: 0,
			size: pageRequest.size,
		};

		if (filterOptions === undefined || filterOptions === null) {
			setPageRequest(pageRequest);
			return;
		}
		const fromFilter: IBridgeKpiPegawaiRequest =
			filterToRequest(filterOptions);

		if (fromFilter === null) {
			setPageRequest(request);
			return;
		}

		if (fromFilter.organization !== undefined) {
			fromFilter.organizationId = fromFilter.organization.id;
			delete fromFilter.organization;
		}
		if (fromFilter.employee !== undefined) {
			fromFilter.nipam = fromFilter.employee.nipam;
			delete fromFilter.employee;
		}
		if (fromFilter.level !== undefined) {
			fromFilter.levelId = fromFilter.level.id;
			delete fromFilter.level;
		}
		if (fromFilter.kpi !== undefined) {
			fromFilter.kpiId = fromFilter.kpi.id;
			delete fromFilter.kpi;
		}
		request = { ...request, ...fromFilter };
		setPageRequest(request);
	}

	useEffect(() => {
		setFilterOptions(bridgeKpiPegawaiFilterType);
	}, [setFilterOptions]);

	return (
		<Grid container spacing={2} sx={{ minHeight: "90vh" }}>
			<Grid item xs={12}>
				<Paper
					elevation={5}
					sx={{ minHeight: 300, width: "100%", p: 1 }}
				>
					<FilterToolbar
						title="Bridge Kpi Pegawai"
						filterHandler={filterHandler}
						findHandler={findHandler}
					/>
					<KpiPegawaiTable />
				</Paper>
			</Grid>
			<FormDialog title="Add Kpi Pegawai" form={<KpiPegawaiForm />} />
			<AddButton toggleDialog={addHandler} />
		</Grid>
	);
};

export default BridgeKpiPegawaiComponent;

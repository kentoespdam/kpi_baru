"use client";
import AddButton from "@commons/components/button/add.button";
import { FilterToolbar } from "@commons/components/filter/filter.toolbar";
import FormDialog from "@commons/components/form.dialog";
import { filterToRequest } from "@helpers/fetch.helper";
import {
	bridgeLevelPerilakuFilterType,
	IBridgeLevelPerilakuRequest,
} from "@interfaces/IBridgeLevelPerilaku";
import { EAuditStatus } from "@interfaces/ICommons";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useBridgeLevelPerilakuStore } from "@storage/bridge/level-perilaku.store";
import { useFilterDialogStore } from "@storage/filter.dialog.store";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import LevelPerilakuForm from "./form";
import LevelPerilakuTable from "./table";

const BridgeLevelPerilakuComponent = () => {
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
		useBridgeLevelPerilakuStore(
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
			setFilterOptions(bridgeLevelPerilakuFilterType);
		setTitle("Filter Bridge Level Perilaku");
		toggleOpen();
	}

	function findHandler() {
		let request = {
			page: 0,
			size: pageRequest.size,
		};

		if (filterOptions === undefined || filterOptions === null) {
			setPageRequest(request);
			return;
		}
		const fromFilter: IBridgeLevelPerilakuRequest =
			filterToRequest(filterOptions);
		if (fromFilter === null) {
			setPageRequest(request);
			return;
		}

		if (fromFilter.perilaku !== undefined) {
			fromFilter.perilakuId = fromFilter.perilaku?.id;
			delete fromFilter.perilaku;
		}
		if (fromFilter.level !== undefined) {
			fromFilter.levelId = fromFilter.level?.id;
			delete fromFilter.level;
		}
		request = { ...request, ...fromFilter };
		setPageRequest(request);
	}

	useEffect(() => {
		setFilterOptions(bridgeLevelPerilakuFilterType);
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
					<LevelPerilakuTable />
				</Paper>
			</Grid>
			<FormDialog title="Add Kpi Pegawai" form={<LevelPerilakuForm />} />
			<AddButton toggleDialog={addHandler} />
		</Grid>
	);
};

export default BridgeLevelPerilakuComponent;

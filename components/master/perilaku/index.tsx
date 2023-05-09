"use client";
import AddButton from "@commons/components/button/add.button";
import { FilterToolbar } from "@commons/components/filter/filter.toolbar";
import FormDialog from "@commons/components/form.dialog";
import { filterToRequest } from "@helpers/fetch.helper";
import { EAuditStatus } from "@interfaces/ICommons";
import { perilakuFilterType } from "@interfaces/IPerilaku";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useFilterDialogStore } from "@storage/filter.dialog.store";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { usePerilakuStore } from "@storage/master/perilaku.store";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import PerilakuForm from "./perilaku.form";
import PerilakuTable from "./table";

const MasterPerilakuComponent = () => {
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
		usePerilakuStore(
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
		if (filterOptions === undefined) setFilterOptions(perilakuFilterType);
		setTitle("Filter Perilaku");
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
		request = { ...request, ...fromFilter };
		setPageRequest(request);
	}

	useEffect(() => {
		setFilterOptions(perilakuFilterType);
	}, [setFilterOptions]);

	return (
		<Grid container spacing={2} sx={{ minHeight: "90vh" }}>
			<Grid item xs={12}>
				<Paper
					elevation={5}
					sx={{ minHeight: 300, width: "100%", p: 1 }}
				>
					<FilterToolbar
						title="Master Perilaku"
						filterHandler={filterHandler}
						findHandler={findHandler}
					/>
					<PerilakuTable />
				</Paper>
			</Grid>
			<FormDialog title="Add Perilaku" form={<PerilakuForm />} />
			<AddButton toggleDialog={addHandler} />
		</Grid>
	);
};

export default MasterPerilakuComponent;

"use client";
import AddButton from "@commons/components/button/add.button";
import { FilterToolbar } from "@commons/components/filter/filter.toolbar";
import FormDialog from "@commons/components/form.dialog";
import { filterToRequest } from "@commons/helpers/fetch.helper";
import { EAuditStatus } from "@commons/interfaces/ICommons";
import { gradeFilterType } from "@commons/interfaces/IGrade";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useFilterDialogStore } from "@storage/filter.dialog.store";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { useGradeStore } from "@storage/master/grade.store";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import GradeForm from "./grade.form";
import GradeTable from "./table";

const GradeComponent = () => {
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

	const { pageRequest, setPageRequest, setAction, setForm } = useGradeStore(
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
		if (filterOptions === undefined) setFilterOptions(gradeFilterType);
		setTitle("Filter Grade");
		toggleOpen();
	}

	async function findHandler() {
		if (filterOptions === undefined) {
			const request = {
				page: 0,
				size: pageRequest.size,
			};
			setPageRequest(request);
			return;
		}
		const fromFilter = filterToRequest(filterOptions);
		const request = {
			...fromFilter,
			page: 0,
			size: pageRequest.size,
		};
		setPageRequest(request);
	}

	useEffect(() => {
		setFilterOptions(gradeFilterType);
	}, [setFilterOptions]);

	return (
		<Grid container spacing={2} sx={{ minHeight: "90vh" }}>
			<Grid item xs={12}>
				<Paper
					elevation={5}
					sx={{ minHeight: 300, width: "100%", p: 1 }}
				>
					<FilterToolbar
						title="Master Grade"
						filterHandler={filterHandler}
						findHandler={findHandler}
					/>
					<GradeTable />
				</Paper>
			</Grid>
			<FormDialog title="Add Grade" form={<GradeForm />} />
			<AddButton toggleDialog={addHandler} />
		</Grid>
	);
};

export default GradeComponent;

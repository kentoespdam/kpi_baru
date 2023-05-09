"use client";
import AddButton from "@commons/components/button/add.button";
import { FilterToolbar } from "@commons/components/filter/filter.toolbar";
import FormDialog from "@commons/components/form.dialog";
import { EAuditStatus } from "@commons/interfaces/ICommons";
import { levelFilterType } from "@commons/interfaces/ILevel";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useFilterDialogStore } from "@storage/filter.dialog.store";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { findHandler, useLevelStore } from "@storage/master/level.store";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import LevelForm from "./level.form";
import LevelTable from "./table/index";

const LevelComponent = () => {
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

	const { setPages, setPageRequest } = useLevelStore(
		(state) => ({
			setPages: state.setPages,
			setPageRequest: state.setPageRequest,
		}),
		shallow
	);
	const { setAction, setForm } = useLevelStore(
		(state) => ({
			setAction: state.setAction,
			setForm: state.setForm,
		}),
		shallow
	);
	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);

	function addHandler() {
		setForm({ status: EAuditStatus.Enabled });
		setAction("create");
		toggleDialog();
	}

	function filterHandler() {
		if (filterOptions === undefined) setFilterOptions(levelFilterType);
		setTitle("Filter Level");
		toggleOpen();
	}

	useEffect(() => {
		setFilterOptions(levelFilterType);
	}, [setFilterOptions]);

	return (
		<Grid container spacing={2} sx={{ minHeight: "90vh" }}>
			<Grid item xs={12}>
				<Box>
					<Paper
						elevation={3}
						sx={{
							minHeight: 300,
							width: "100%",
							p: 1,
						}}
					>
						<FilterToolbar
							title="Master Level"
							filterHandler={filterHandler}
							findHandler={() =>
								findHandler({
									filterOptions,
									setPageRequest: setPageRequest,
									setPages: setPages,
								})
							}
						/>
						<LevelTable />
					</Paper>
				</Box>
			</Grid>
			<FormDialog title="Add Level" form={<LevelForm />} />
			<AddButton toggleDialog={addHandler} />
		</Grid>
	);
};

export default LevelComponent;

"use client";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import React from "react";
import Divider from "@mui/material/Divider";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import { useFilterDialogStore } from "@storage/filter.dialog.store";
import FilterDialog from "@commons/components/filter/filter.dialog";
import FilterChip from "@commons/components/filter/filter.chip";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

type FileterToolbarProps = {
	title: string;
	filterHandler: () => void;
	findHandler: () => void;
	download?: boolean;
	downloadHandler?: () => void;
};
export const FilterToolbar = (props: FileterToolbarProps) => {
	const { title, filterHandler, findHandler, download, downloadHandler } =
		props;

	const isOpen = useFilterDialogStore((state) => state.isOpen);

	return (
		<Grid container direction="row" spacing={1} sx={{ mb: 1 }}>
			<Grid item lg={12}>
				<Typography variant="h6" component="h4">
					{title}
				</Typography>
				<Divider />
			</Grid>

			<Grid item lg={12}>
				<Button
					variant="outlined"
					size="small"
					startIcon={<TuneOutlinedIcon />}
					sx={{ mr: 1 }}
					onClick={filterHandler}
				>
					Filter
				</Button>
				<Button
					startIcon={<LoopOutlinedIcon />}
					variant="outlined"
					size="small"
					sx={{ mr: 1 }}
					onClick={findHandler}
				>
					FIND
				</Button>
				{download && (
					<Button
						startIcon={<DownloadOutlinedIcon />}
						variant="outlined"
						size="small"
						sx={{ mr: 1 }}
						onClick={downloadHandler}
					>
						Excel
					</Button>
				)}
			</Grid>
			<Grid item lg={12}>
				<FilterChip />
			</Grid>
			{isOpen && <FilterDialog />}
		</Grid>
	);
};

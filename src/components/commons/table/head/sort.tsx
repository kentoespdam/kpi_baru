import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
const TableRow=dynamic(()=>import("@mui/material/TableRow"))
import Typography from "@mui/material/Typography";
import { MyTableHead, SortRequest } from "@myTypes/table";
import dynamic from "next/dynamic";
import React from "react";

const ArrowDropDownOutlinedIcon=dynamic(()=>import("@mui/icons-material/ArrowDropDownOutlined"))
const ArrowDropUpOutlinedIcon=dynamic(()=>import("@mui/icons-material/ArrowDropUpOutlined"))

type HeaderCellBuilderProps = {
	header: MyTableHead;
	handleSort: (sort: string | null, direction: "asc" | "desc") => void;
	sortRequest?: SortRequest;
};
const HeaderCellBuilder = (props: HeaderCellBuilderProps) => {
	const { header, handleSort, sortRequest } = props;
	const { field, title, sortable, minWidth, ...other } = header;
	const [direction, setDirection] = React.useState<"asc" | "desc">(
		sortRequest !== undefined && sortRequest.sort === field
			? sortRequest.direction
			: "asc"
	);

	const handleClick = () => {
		setDirection(direction === "asc" ? "desc" : "asc");
		handleSort(field, direction);
	};

	return (
		<TableCell
			onClick={handleClick}
			sx={{
				"cursor": "pointer",
				"&:hover": {
					backgroundColor: "rgba(0, 0, 0, 0.05)",
				},
				"&:active": {
					backgroundColor: "rgba(0, 0, 0, 0.1)",
				},
				"minWidth": minWidth,
			}}
			sortDirection="asc"
			{...other}
		>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
			>
				<Typography
					variant="body2"
					component="span"
					sx={{ fontWeight: 600, width: "100%", fontSize: ".875rem" }}
				>
					{title}
				</Typography>
				<IconButton>
					{sortable && sortable === "true" ? (
						direction === "asc" ? (
							<ArrowDropDownOutlinedIcon />
						) : (
							<ArrowDropUpOutlinedIcon />
						)
					) : null}
				</IconButton>
			</Stack>
		</TableCell>
	);
};

type HeaderSortBuilderProps = {
	headers: MyTableHead[];
	handleSort: (sort: string | null, direction: "asc" | "desc") => void;
	sortRequest?: SortRequest;
};
const HeaderSortBuilder = (props: HeaderSortBuilderProps) => {
	const { headers, handleSort, sortRequest } = props;
	return (
		<TableRow>
			{headers.map((header, index) => (
				<HeaderCellBuilder
					key={index}
					header={header}
					handleSort={handleSort}
					sortRequest={sortRequest}
				/>
			))}
		</TableRow>
	);
};

export default HeaderSortBuilder;

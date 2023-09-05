"use client";

import dynamic from "next/dynamic";

const IconButton = dynamic(() => import("@mui/material/IconButton"));
const Stack = dynamic(() => import("@mui/material/Stack"));
const Tooltip = dynamic(() => import("@mui/material/Tooltip"));
const EditIcon = dynamic(() => import("@mui/icons-material/Edit"));
const HighlightOffIcon = dynamic(
	() => import("@mui/icons-material/HighlightOff")
);
const TableCell = dynamic(() => import("@mui/material/TableCell"));

export type BtnActionBuilderProps = {
	deleteHandler: () => void;
	editHandler: () => void;
};
const BtnActionBuilder = (props: BtnActionBuilderProps) => {
	const { deleteHandler, editHandler } = props;
	return (
		<TableCell>
			<Stack
				direction="row"
				spacing={1}
				sx={{ display: "flex", justifyContent: "center" }}
			>
				<Tooltip title="Delete" followCursor>
					<IconButton
						color="error"
						size="small"
						onClick={deleteHandler}
					>
						<HighlightOffIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Edit" followCursor>
					<IconButton
						color="primary"
						size="small"
						onClick={editHandler}
					>
						<EditIcon />
					</IconButton>
				</Tooltip>
			</Stack>
		</TableCell>
	);
};

export default BtnActionBuilder;

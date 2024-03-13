"use client";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import dynamic from "next/dynamic";

const EditIcon = dynamic(() => import("@mui/icons-material/Edit"));
const HighlightOffIcon = dynamic(
	() => import("@mui/icons-material/HighlightOff")
);

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

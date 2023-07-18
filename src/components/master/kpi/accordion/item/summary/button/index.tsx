import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ITEM_HEIGHT } from "@myConfig/index";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type KpiMenuItemButtonProps = {
	kpiId: number;
	anchorEl: HTMLElement | null;
	setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
	open: boolean;
};
const KpiMenuItemButton = (props: KpiMenuItemButtonProps) => {
	const { kpiId, anchorEl, setAnchorEl, open } = props;

	const handleEdit = () => {};
	const handleDelete = () => {};

	return (
		<Menu
			id="long-menu"
			MenuListProps={{
				"aria-labelledby": "long-button",
			}}
			anchorEl={anchorEl}
			open={open}
			onClose={() => setAnchorEl(null)}
			slotProps={{
				paper: {
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: "20ch",
					},
				},
			}}
		>
			<ListItemButton
				LinkComponent={Link}
				href={`/master/kpi/edit/${kpiId}`}
			>
				<ListItemIcon>
					<EditIcon color="primary" />
				</ListItemIcon>
				<ListItemText primary="Edit" />
			</ListItemButton>
			<MenuItem onClick={handleDelete}>
				<ListItemIcon>
					<DeleteForeverIcon color="error" />
				</ListItemIcon>
				<ListItemText primary="Delete" />
			</MenuItem>
		</Menu>
	);
};

export default KpiMenuItemButton;

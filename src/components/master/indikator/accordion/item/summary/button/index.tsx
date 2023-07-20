import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ITEM_HEIGHT } from "@myConfig/index";
import { IndikatorWithAudit } from "@myTypes/entity/indikator";
import { useIndikatorStore } from "@store/filter/master/indikator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import { Dispatch, SetStateAction } from "react";
import { doDelete } from "src/utils/master/indikator";

type IndikatorMenuItemButtonProps = {
	indikatorWithAudit: IndikatorWithAudit;
	anchorEl: HTMLElement | null;
	setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
	open: boolean;
};
const IndikatorMenuItemButton = (props: IndikatorMenuItemButtonProps) => {
	const { indikatorWithAudit, anchorEl, setAnchorEl, open } = props;
	const qc = useQueryClient();
	const { pageRequest, sortRequest, kpiId, indikator, status } =
		useIndikatorStore();

	const mutation = useMutation({
		mutationKey: [`master.indikator.delete`, indikatorWithAudit.id],
		mutationFn: (id: number) => doDelete(id),
		onSuccess: (data) => {
			qc.invalidateQueries([
				"master.indikator",
				{ pageRequest, sortRequest },
				{ kpiId, indikator, status },
			]);
			enqueueSnackbar("Delete Grade success", { variant: "success" });
		},
		onError: (error: Error) => {
			enqueueSnackbar(error.message, { variant: "error" });
		},
	});

	const handleDelete = async () => {
		const c = confirm(`Apakah anda yakin ingin data indikator ini?`);
		if (!c) return;
		setAnchorEl(null);
		mutation.mutate(indikatorWithAudit.id);
	};

	return (
		<Menu
			id="long-menu"
			MenuListProps={{
				"aria-labelledby": "long-button",
			}}
			anchorEl={anchorEl}
			open={open}
			onClose={() => setAnchorEl(null)}
			PaperProps={{
				style: {
					maxHeight: ITEM_HEIGHT * 4.5,
					width: "20ch",
				},
			}}
		>
			<ListItemButton
				LinkComponent={Link}
				href={`/master/indikator/edit/${indikatorWithAudit.id}`}
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

export default IndikatorMenuItemButton;

import ListItemButton from "@mui/material/ListItemButton";
import { ITEM_HEIGHT } from "@myConfig/index";
import { Uraian } from "@myTypes/entity/uraian";
import { useUraianStore } from "@store/filter/master/uraian";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { Dispatch, SetStateAction } from "react";
import { doDelete } from "src/utils/master/uraian";

const DeleteForeverIcon = dynamic(
	() => import("@mui/icons-material/DeleteForever")
);
const EditIcon = dynamic(() => import("@mui/icons-material/Edit"));
const ListItemIcon = dynamic(() => import("@mui/material/ListItemIcon"));
const ListItemText = dynamic(() => import("@mui/material/ListItemText"));
const Menu = dynamic(() => import("@mui/material/Menu"));
const MenuItem = dynamic(() => import("@mui/material/MenuItem"));

type UraianMenuItemProps = {
	uraian: Uraian;
	anchorEl: HTMLElement | null;
	setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
	open: boolean;
};
const UraianMenuItem = (props: UraianMenuItemProps) => {
	const { uraian: item, anchorEl, setAnchorEl, open } = props;
	const {
		pageRequest,
		sortRequest,
		indikatorId,
		uraian,
		kpiId,
		profesiId,
		levelId,
		status,
	} = useUraianStore();

	const { enqueueSnackbar } = useSnackbar();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (id: number) => doDelete(id),
		onSuccess: () => {
			queryClient.invalidateQueries([
				"master.uraian",
				{ pageRequest, sortRequest },
				{ indikatorId, uraian, kpiId, profesiId, levelId, status },
			]);
			enqueueSnackbar("Delete Grade success", { variant: "success" });
		},
		onError: () => {
			enqueueSnackbar("Delete Grade failed", { variant: "error" });
		},
	});

	const handleDelete = async () => {
		const c = confirm("Apakah anda yakin ingin menghapus data ini?");
		if (!c) return;
		setAnchorEl(null);
		mutation.mutate(item.id);
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
				href={`/master/uraian/edit/${item.id}/${kpiId}`}
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

export default UraianMenuItem;

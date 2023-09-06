import { ITEM_HEIGHT } from "@myConfig/index";
import { useKpiStore } from "@store/filter/master/kpi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doDelete } from "@utils/master/kpi";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { Dispatch, SetStateAction } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import dynamic from "next/dynamic";

const DeleteForeverIcon = dynamic(
	() => import("@mui/icons-material/DeleteForever")
);
const EditIcon = dynamic(() => import("@mui/icons-material/Edit"));
const ListItemIcon = dynamic(() => import("@mui/material/ListItemIcon"));
const ListItemText = dynamic(() => import("@mui/material/ListItemText"));
const Menu = dynamic(() => import("@mui/material/Menu"));
const MenuItem = dynamic(() => import("@mui/material/MenuItem"));

type KpiMenuItemButtonProps = {
	kpiId: number;
	anchorEl: HTMLElement | null;
	setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
	open: boolean;
};
const KpiMenuItemButton = (props: KpiMenuItemButtonProps) => {
	const { kpiId, anchorEl, setAnchorEl, open } = props;
	const { enqueueSnackbar } = useSnackbar();
	const qc = useQueryClient();
	const {
		pageRequest,
		sortRequest,
		organization,
		position,
		profesi,
		name,
		grade,
		status,
	} = useKpiStore();

	const mutation = useMutation({
		mutationFn: doDelete,
		onError: (error) => {
			enqueueSnackbar(`${error}`, { variant: "error" });
		},
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [
					"master.kpi",
					{ pageRequest, sortRequest },
					{ organization, position, profesi, name, grade, status },
				],
			});
			enqueueSnackbar("Data berhasil dihapus", { variant: "success" });
		},
	});

	const handleDelete = () => {
		const x = confirm("Apakah anda yakin ingin menghapus KPI ini?");
		if (!x) return;
		mutation.mutate(kpiId);
		setAnchorEl(null);
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

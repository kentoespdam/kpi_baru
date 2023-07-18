import MoreVertIcon from "@mui/icons-material/MoreVert";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { KpiWithAudit } from "@myTypes/entity/kpi";
import { useState } from "react";
import KpiMenuItemButton from "./button";

type KpiItemSummaryProps = {
	kpi: KpiWithAudit;
	urut: number;
};
const KpiItemSummary = (props: KpiItemSummaryProps) => {
	const { kpi, urut } = props;
	const matches = useMediaQuery("(min-width:600px)");
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			sx={{ width: "100%" }}
			spacing={matches ? 2 : 0}
		>
			<Stack
				direction={matches ? "row" : "column"}
				justifyContent={matches ? "space-between" : "center"}
				textAlign={matches ? "justify" : "center"}
				alignItems="center"
				sx={{ width: "100%" }}
				spacing={matches ? 2 : 0}
			>
				<Typography variant="subtitle1">{urut}.</Typography>
				<Stack direction="column" sx={{ flex: 2 }}>
					<Typography variant="subtitle1">{kpi.name}</Typography>
					<Typography variant="body2" color="text.secondary">
						{kpi.profesi.name}
					</Typography>
				</Stack>
				<Stack direction="column" sx={{ flex: 2 }}>
					<Typography variant="body1">
						{kpi.organization?.name}
					</Typography>
					<Typography variant="subtitle2" color="text.secondary">
						{kpi.position?.name}
					</Typography>
				</Stack>
				<Chip
					label={kpi.status}
					color={kpi.status === "Enabled" ? "info" : "error"}
				/>
			</Stack>

			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? "long-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleClick}
				sx={{ flex: 1 }}
			>
				<MoreVertIcon />
			</IconButton>
			<KpiMenuItemButton
				kpiId={kpi.id}
				anchorEl={anchorEl}
				setAnchorEl={setAnchorEl}
				open={open}
			/>
		</Stack>
	);
};

export default KpiItemSummary;

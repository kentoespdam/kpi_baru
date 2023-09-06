import useMediaQuery from "@mui/material/useMediaQuery";
import { KpiWithAudit } from "@myTypes/entity/kpi";
import dynamic from "next/dynamic";
import { useState } from "react";

const KpiMenuItemButton = dynamic(() => import("./button"));
const MoreVertIcon = dynamic(() => import("@mui/icons-material/MoreVert"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const Stack = dynamic(() => import("@mui/material/Stack"));
const Typography = dynamic(() => import("@mui/material/Typography"));

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
					<Stack direction="row" spacing={1}>
						<Typography variant="subtitle1">{kpi.name}</Typography>
						<Typography
							variant="caption"
							color="text.secondary"
							fontSize={10}
						>
							GRADE {kpi.grade.grade}
						</Typography>
					</Stack>
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

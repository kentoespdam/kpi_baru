import { IndikatorWithAudit } from "@myTypes/entity/indikator";
import { useTemplateStore } from "@store/main/template";
import dynamic from "next/dynamic";
import { useState } from "react";

const IndikatorMenuItemButton = dynamic(() => import("./button"));
const MoreVertIcon = dynamic(() => import("@mui/icons-material/MoreVert"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const Stack = dynamic(() => import("@mui/material/Stack"));
const Typography = dynamic(() => import("@mui/material/Typography"));

type IndikatorItemSummaryProps = {
	indikatorWithAudit: IndikatorWithAudit;
	urut: number;
};
const IndikatorItemSummary = (props: IndikatorItemSummaryProps) => {
	const { indikatorWithAudit, urut } = props;
	const isDesktop = useTemplateStore((state) => state.isDesktop);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<Stack
			direction="row"
			justifyContent={isDesktop ? "space-between" : "center"}
			alignItems="center"
			sx={{ width: "100%" }}
			spacing={isDesktop ? 2 : 0}
		>
			<Stack
				direction={isDesktop ? "row" : "column"}
				justifyContent="space-between"
				alignItems="center"
				sx={{ width: "100%" }}
				spacing={isDesktop ? 2 : 0}
			>
				<Stack
					direction={isDesktop ? "row" : "column"}
					justifyContent={isDesktop ? "flex-start" : "center"}
					alignItems="center"
					sx={{ width: "100%" }}
					spacing={isDesktop ? 2 : 0}
				>
					<Typography variant="subtitle1">{urut}.</Typography>
					<Typography variant="subtitle1">
						{indikatorWithAudit.indikator}
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
			<IndikatorMenuItemButton
				indikatorWithAudit={indikatorWithAudit}
				anchorEl={anchorEl}
				setAnchorEl={setAnchorEl}
				open={open}
			/>
		</Stack>
	);
};

export default IndikatorItemSummary;

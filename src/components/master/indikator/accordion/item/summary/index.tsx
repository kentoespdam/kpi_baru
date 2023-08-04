import MoreVertIcon from "@mui/icons-material/MoreVert";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { IndikatorWithAudit } from "@myTypes/entity/indikator";
import { useTemplateStore } from "@store/main/template";
import { useState } from "react";
import IndikatorMenuItemButton from "./button";

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
				<Chip
					label={indikatorWithAudit.status}
					color={
						indikatorWithAudit.status === "Enabled"
							? "success"
							: "error"
					}
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

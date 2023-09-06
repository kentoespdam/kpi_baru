import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Uraian } from "@myTypes/entity/uraian";
import dynamic from "next/dynamic";
import { useState } from "react";

const UraianMenuItem = dynamic(() => import("../menu"));
const MoreVertIcon = dynamic(() => import("@mui/icons-material/MoreVert"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const ListItem = dynamic(() => import("@mui/material/ListItem"));
const Stack = dynamic(() => import("@mui/material/Stack"));
const Typography = dynamic(() => import("@mui/material/Typography"));

type UraianListItemProps = {
	uraian: Uraian;
	urut: number;
};
const UraianListItem = (props: UraianListItemProps) => {
	const { uraian, urut } = props;
	const theme = useTheme();
	const matches = useMediaQuery("(min-width:600px)");
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	return (
		<>
			<ListItem
				sx={{
					borderBottom: `solid 1px ${theme.palette.divider}`,
				}}
				secondaryAction={
					<IconButton
						aria-label="more"
						id="long-button"
						aria-controls={open ? "long-menu" : undefined}
						aria-expanded={open ? "true" : undefined}
						aria-haspopup="true"
						onClick={handleClick}
						sx={{ ml: 2 }}
					>
						<MoreVertIcon />
					</IconButton>
				}
			>
				<Grid
					container
					direction={matches ? "row" : "column"}
					alignItems="center"
					justifyContent="space-between"
				>
					<Stack
						direction={matches ? "row" : "column"}
						justifyContent={
							matches ? "flex-start" : "space-between"
						}
						alignItems={"center"}
						textAlign={matches ? "justify" : "center"}
						spacing={matches ? 2 : 0}
					>
						<Typography variant="subtitle1">{urut}.</Typography>
						<Typography variant="subtitle1">
							{uraian.uraian}
						</Typography>
					</Stack>
					<Grid
						item
						display="flex"
						justifyContent={matches ? "flex-end" : "center"}
						alignItems="center"
					>
						<Stack
							direction="column"
							alignItems="center"
							alignContent="center"
							textAlign="center"
							sx={{
								mx: 1,
							}}
						>
							<Typography variant="body2">
								Target Nilai
							</Typography>
							<Typography variant="subtitle1">
								({uraian.target}) {uraian.volume}{" "}
								{uraian.satuan}
							</Typography>
						</Stack>
						<Grid
							item
							sx={{
								mx: 1,
							}}
							textAlign="center"
						>
							<Typography variant="body2">
								Target Waktu
							</Typography>
							<Typography variant="subtitle1">
								{uraian.waktu}
							</Typography>
						</Grid>
						<Grid
							item
							sx={{
								mx: 1,
							}}
							textAlign="center"
						>
							<Typography variant="body2">Bobot</Typography>
							<Typography variant="subtitle1">
								{uraian.bobot} %
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</ListItem>
			<UraianMenuItem
				uraian={uraian}
				anchorEl={anchorEl}
				setAnchorEl={setAnchorEl}
				open={open}
			/>
		</>
	);
};

export default UraianListItem;

"use client";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTemplateStore } from "@storage/template";
import HeaderAccount from "./header.account";

const TopBar = ({ elv }: { elv: number }) => {
	const toggleMenu = useTemplateStore((state) => state.toggleMenu);

	return (
		<AppBar
			elevation={elv}
			color="transparent"
			sx={{
				backdropFilter:
					elv === 0 ? "" : "saturate(200%) blur(1.875rem)",
			}}
		>
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					aria-label="Main Menu"
					sx={{ mr: 2 }}
					onClick={toggleMenu}
				>
					<MenuIcon />
				</IconButton>

				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					KPI Pegawai PerumdamTS
				</Typography>

				<HeaderAccount />
			</Toolbar>
		</AppBar>
	);
};

export default TopBar;

"use client";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Theme, useTheme } from "@mui/material/styles";
import { drawerWidth } from "@myConfig/index";
import { useMenuStore } from "@store/main/menu";
import { useTemplateStore } from "@store/main/template";
import { shallow } from "zustand/shallow";
import Logo from "./logo";
import DrawerContent from "./content";

const openedMixin = (theme: Theme) => ({
	width: drawerWidth,
	borderRight: `1px solid ${theme.palette.divider}`,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
	boxShadow: "none",
});

const closedMixin = (theme: Theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: 0,
	borderRight: "none",
	boxShadow: theme.customShadows.z1,
});

const MenuDrawerComponent = () => {
	const theme = useTheme();
	const isDesktop = useTemplateStore((state) => state.isDesktop);
	const { isMenuOpen, toggleDrawer } = useMenuStore(
		(state) => ({
			isMenuOpen: state.isMenuOpen,
			toggleDrawer: state.toggleDrawer,
		}),
		shallow
	);

	const variant = isDesktop ? "permanent" : "temporary";

	return (
		<Drawer
			anchor="left"
			open={isMenuOpen}
			onClose={toggleDrawer}
			variant={variant}
			sx={{
				flexShrink: 0,
				whiteSpace: "nowrap",
				boxSizing: "border-box",
				...(isMenuOpen && {
					...openedMixin(theme),
					"& .MuiDrawer-paper": openedMixin(theme),
				}),
				...(!isMenuOpen && {
					...closedMixin(theme),
					"& .MuiDrawer-paper": closedMixin(theme),
				}),
			}}
		>
			<Box
				sx={{
					display: "flex",
					borderBottom: `1px solid ${theme.palette.divider}`,
				}}
			>
				<Toolbar>
					<Stack
						direction="row"
						spacing={1}
						sx={{ alignItems: "center" }}
					>
						<Logo />
						<Typography variant="h5" sx={{ flexGrow: 1 }}>
							Perumdam Tirta Satria
						</Typography>
					</Stack>
				</Toolbar>
			</Box>

			{isMenuOpen ? <DrawerContent /> : null}
		</Drawer>
	);
};

export default MenuDrawerComponent;

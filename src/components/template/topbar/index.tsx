"use client";

import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Theme, useTheme } from "@mui/material/styles";
import { buttonSelectedColor, drawerWidth } from "@myConfig/index";
import { useMenuStore } from "@store/main/menu";
import { useTemplateStore } from "@store/main/template";
import { shallow } from "zustand/shallow";
import ProfileComponent from "./profile";

const appBarSx = (theme: Theme, isOpen: boolean, isDesktop: boolean) => {
	return {
		borderBottom: `1px solid ${theme.palette.divider}`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		...(isOpen &&
			isDesktop && {
				marginLeft: drawerWidth,
				width: `calc(100% - ${drawerWidth}px)`,
				transition: theme.transitions.create(["width", "margin"], {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.enteringScreen,
				}),
			}),
	};
};

const TopBarComponent = () => {
	const theme = useTheme();
	const { isMenuOpen, toggleDrawer } = useMenuStore(
		(state) => ({
			isMenuOpen: state.isMenuOpen,
			toggleDrawer: state.toggleDrawer,
		}),
		shallow
	);
	const isDesktop = useTemplateStore((state) => state.isDesktop, shallow);
	const sx = appBarSx(theme, isMenuOpen, isDesktop);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar elevation={0} color="inherit" position="fixed" sx={sx}>
				<Toolbar>
					<IconButton
						disableRipple
						edge="start"
						aria-label="Main Menu"
						sx={{
							color: "text.primary",
							...(isMenuOpen && { bgcolor: buttonSelectedColor }),
							ml: { xs: 0, lg: -2 },
							mr: 2,
						}}
						color="secondary"
						onClick={toggleDrawer}
					>
						{isMenuOpen ? (
							<MenuFoldOutlined />
						) : (
							<MenuUnfoldOutlined />
						)}
					</IconButton>

					<Typography variant="body1" sx={{ flexGrow: 1 }}>
						KPI Pegawai PerumdamTS
					</Typography>
					<ProfileComponent />
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default TopBarComponent;

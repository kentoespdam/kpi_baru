"use client";

import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";
import { useMediaQuery } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Theme, useTheme } from "@mui/material/styles";
import { buttonSelectedColor, drawerWidth } from "@myConfig/index";
import { useEffect } from "react";
import { useMenuStore } from "src/store/main/menu";
import { useTemplateStore } from "src/store/main/template";
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
	const { isDesktop, setDesktop } = useTemplateStore(
		(state) => ({
			isDesktop: state.isDesktop,
			setDesktop: state.setDesktop,
		}),
		shallow
	);
	const sx = appBarSx(theme, isMenuOpen, isDesktop);
	const matches = useMediaQuery(`(min-width:600px)`);

	useEffect(() => {
		setDesktop(matches);
		return () => {
			setDesktop(matches);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [matches]);

	return (
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
					{isMenuOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
				</IconButton>

				<Typography variant="body1" sx={{ flexGrow: 1 }}>
					KPI Pegawai PerumdamTS
				</Typography>
				<ProfileComponent />
			</Toolbar>
		</AppBar>
	);
};

export default TopBarComponent;

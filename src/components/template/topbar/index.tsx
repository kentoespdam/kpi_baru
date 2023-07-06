"use client";

import { useMediaQuery } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { Theme, useTheme } from "@mui/material/styles";
import { drawerWidth } from "@myConfig/index";
import { useMenuStore } from "src/store/main/menu";
import { useTemplateStore } from "src/store/main/template";
import { shallow } from "zustand/shallow";
import Toolbar from "@mui/material/Toolbar";

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
	const { isMenuOpen } = useMenuStore(
		(state) => ({
			isMenuOpen: state.isMenuOpen,
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

	return (
		<AppBar elevation={0} color="inherit" position="fixed" sx={sx}>
			<Toolbar />
		</AppBar>
	);
};

export default TopBarComponent;

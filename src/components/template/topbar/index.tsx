"use client";

import { Theme, useTheme } from "@mui/material/styles";
import { buttonSelectedColor, drawerWidth } from "@myConfig/index";
import { useMenuStore } from "@store/main/menu";
import { useTemplateStore } from "@store/main/template";
import dynamic from "next/dynamic";

const ProfileComponent = dynamic(() => import("./profile"));
const MenuFoldOutlined = dynamic(
	() => import("@ant-design/icons/MenuFoldOutlined")
);
const MenuUnfoldOutlined = dynamic(
	() => import("@ant-design/icons/MenuUnfoldOutlined")
);
const AppBar = dynamic(() => import("@mui/material/AppBar"));
const Box = dynamic(() => import("@mui/material/Box"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const Toolbar = dynamic(() => import("@mui/material/Toolbar"));
const Typography = dynamic(() => import("@mui/material/Typography"));

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
	const { isMenuOpen, toggleDrawer } = useMenuStore((state) => ({
		isMenuOpen: state.isMenuOpen,
		toggleDrawer: state.toggleDrawer,
	}));
	const isDesktop = useTemplateStore((state) => state.isDesktop);
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

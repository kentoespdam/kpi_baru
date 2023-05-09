"use client";
import { IMenu, menuList } from "@commons/menu.list";
import Close from "@mui/icons-material/Close";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTemplateStore } from "@storage/template";
import Link from "next/link";
import React from "react";

type IMenuItemComponentProps = {
	item: IMenu;
};

const MenuItemComponent = (props: IMenuItemComponentProps) => {
	const toggleMenu = useTemplateStore((state) => state.toggleMenu);
	const { item } = props;

	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	return item.subMenu === undefined ? (
		<ListItem disablePadding>
			<ListItemButton
				component={Link}
				href={item.path}
				onClick={toggleMenu}
			>
				<ListItemAvatar>{item.icon}</ListItemAvatar>
				<ListItemText primary={item.name} />
			</ListItemButton>
		</ListItem>
	) : (
		<>
			<ListItem disablePadding>
				<ListItemButton onClick={handleClick}>
					<ListItemAvatar>{item.icon}</ListItemAvatar>
					<ListItemText primary={item.name} />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="nav" disablePadding sx={{ pl: 2 }}>
					{item.subMenu.map((sub, index) => (
						<ListItem key={index} disablePadding>
							<ListItemButton
								component={Link}
								href={sub.path}
								onClick={toggleMenu}
								sx={{ pt: 0.5, pb: 0.5 }}
							>
								<ListItemAvatar>{sub.icon}</ListItemAvatar>
								<ListItemText primary={sub.name} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Collapse>
		</>
	);
};

const MenuDrawerComponent = () => {
	const { isMenuOpen, toggleMenu } = useTemplateStore();

	return (
		<React.Fragment key="right">
			<Drawer anchor="left" open={isMenuOpen} onClose={toggleMenu}>
				<Box
					sx={{ width: 250 }}
					role="presentation"
					onKeyDown={toggleMenu}
				>
					<List component="nav" disablePadding>
						<ListItem
							key="closeDrawerBt"
							secondaryAction={
								<IconButton
									edge="end"
									aria-label="close drawer"
									onClick={toggleMenu}
								>
									<Close />
								</IconButton>
							}
						>
							<ListItemText primary="Perumdam TS" />
						</ListItem>
						<Divider />
						{menuList.map((item, index) => (
							<MenuItemComponent key={index} item={item} />
						))}
					</List>
				</Box>
			</Drawer>
		</React.Fragment>
	);
};

export default MenuDrawerComponent;

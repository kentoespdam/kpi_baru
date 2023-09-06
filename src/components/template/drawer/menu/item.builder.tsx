import { IMenu, ISubMenu } from "@components/template/menu.list";
import ListItemButton from "@mui/material/ListItemButton";
import { useMenuStore } from "@store/main/menu";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ListItemIcon = dynamic(() => import("@mui/material/ListItemIcon"));
const ListItemText = dynamic(() => import("@mui/material/ListItemText"));
const Typography = dynamic(() => import("@mui/material/Typography"));

const selectedCheck = (pathname: string, itemPath: string) => {
	return pathname === itemPath;
};

const MenuItemBuilder = ({ item }: { item: IMenu | ISubMenu }) => {
	const toggleDrawer = useMenuStore.getState().toggleDrawer;
	const pathname = usePathname();
	const isSelected = selectedCheck(pathname, item.path);

	const textColor = "text.primary";
	const iconSelectedColor = "primary.main";

	return (
		<ListItemButton
			component={Link}
			href={`${item.path}`}
			sx={{
				zIndex: 1201,
				pl: 3,
			}}
			selected={isSelected}
			onClick={toggleDrawer}
		>
			<ListItemIcon
				sx={{
					minWidth: 28,
					color: isSelected ? iconSelectedColor : textColor,
				}}
			>
				{item.icon}
			</ListItemIcon>
			<ListItemText
				primary={
					<Typography
						variant="h6"
						color={isSelected ? "primary.main" : "text.primary"}
					>
						{item.name}
					</Typography>
				}
			/>
		</ListItemButton>
	);
};

export default MenuItemBuilder;

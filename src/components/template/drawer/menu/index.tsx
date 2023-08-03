import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { IMenu } from "@template/menu.list";
import MenuItemBuilder from "./item.builder";
import { useSessionStore } from "@store/main/session";

const MenuBuilder = ({ item }: { item: IMenu }) => {
	const user = useSessionStore.getState().user;
	const isAdmin = user?.prefs.roles?.includes("admin");

	return item.type === "group" ? (
		<List
			subheader={
				<Box sx={{ pl: 3, mb: 1.5 }}>
					<Typography variant="subtitle2" color="textSecondary">
						{item.name}
					</Typography>
				</Box>
			}
		>
			{item.subMenu?.map((sub, index) => {
				return isAdmin ? (
					<MenuItemBuilder key={index} item={sub} />
				) : sub.role === "staff" ? (
					<MenuItemBuilder key={index} item={sub} />
				) : null;
			})}
		</List>
	) : null;
};

export default MenuBuilder;

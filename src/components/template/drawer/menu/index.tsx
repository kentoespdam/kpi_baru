import { IMenu } from "@template/menu.list";
import { useSessionStore } from "@store/main/session";
import { USER_ROLE } from "@myTypes/index";
import dynamic from "next/dynamic";

const Box = dynamic(() => import("@mui/material/Box"));
const List = dynamic(() => import("@mui/material/List"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const MenuItemBuilder = dynamic(() => import("./item.builder"));

const MenuBuilder = ({ item }: { item: IMenu }) => {
	const user = useSessionStore.getState().user;
	const isAdmin = user?.prefs.roles?.includes(USER_ROLE.ADMIN);

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
				) : sub.role === USER_ROLE.USER ? (
					<MenuItemBuilder key={index} item={sub} />
				) : null;
			})}
		</List>
	) : null;
};

export default MenuBuilder;

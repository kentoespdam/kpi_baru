import Box from "@mui/material/Box";
import { USER_ROLE } from "@myTypes/index";
import { useMenuStore } from "@store/main/menu";
import { useSessionStore } from "@store/main/session";
import { menuList } from "../menu.list";
import MenuBuilder from "./menu";

const DrawerContent = () => {
	const toggleDrawer = useMenuStore((state) => state.toggleDrawer);
	const user = useSessionStore.getState().user;
	const isAdmin = user?.prefs.roles?.includes(USER_ROLE.ADMIN);

	return (
		<Box
			onKeyDown={toggleDrawer}
			sx={{
				"height": "100%",
				"pt": 2,
				"overflowY": "hidden",
				"&:hover": {
					"overflowY": "scroll",
					"&::-webkit-scrollbar": {
						width: "5px",
					},
					"&::-webkit-scrollbar-track": {
						WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
					},
					"&::-webkit-scrollbar-thumb": {
						bgcolor: "hsl(215.02deg 100% 54.31% / 18%)",
					},
				},
			}}
		>
			{menuList.map((item, index) =>
				isAdmin ? (
					<MenuBuilder key={index} item={item} />
				) : item.role === USER_ROLE.USER ? (
					<MenuBuilder key={index} item={item} />
				) : null
			)}
		</Box>
	);
};

export default DrawerContent;

import Box from "@mui/material/Box";
import { useMenuStore } from "src/store/main/menu";
import { menuList } from "../menu.list";
import MenuBuilder from "./menu";

const DrawerContent = () => {
	const toggleDrawer = useMenuStore((state) => state.toggleDrawer);

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
			{menuList.map((item, index) => (
				<MenuBuilder key={index} item={item} />
			))}
		</Box>
	);
};

export default DrawerContent;

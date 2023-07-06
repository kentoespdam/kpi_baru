import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { IMenu } from "@template/menu.list";
import MenuItemBuilder from "./item.builder";

const MenuBuilder = ({ item }: { item: IMenu }) => {
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
			{item.subMenu?.map((sub, index) => (
				<MenuItemBuilder key={index} item={sub} />
			))}
		</List>
	) : null;
};

export default MenuBuilder;

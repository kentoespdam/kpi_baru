import { capitalize } from "@helper/strings";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Organization } from "@myTypes/entity/organization";
import React from "react";
import Divider from "@mui/material/Divider";
import { useOrgAdminStore } from "@store/filter/trans/org.admin.store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type LevelParserProps = { data: Organization[]; title: string };

const LevelParser = (props: LevelParserProps) => {
	const { selected, setSelected } = useOrgAdminStore();
	const handleClick = (value: string | false) => {
		setSelected(selected === value ? false : value);
	};
	return props.data.length > 0 ? (
		<List
			component="div"
			disablePadding
			subheader={
				<Box sx={{ mb: 1.5 }}>
					<Typography variant="subtitle2" color="textSecondary">
						{props.title}
					</Typography>
				</Box>
			}
		>
			{props.data.map((org) => (
				<React.Fragment key={org.id}>
					<ListItemButton
						selected={
							selected === `orgList${org.id}` ? true : false
						}
						onClick={() => handleClick(`orgList${org.id}`)}
					>
						<ListItemText>- {capitalize(org.name)}</ListItemText>
					</ListItemButton>
					<Divider />
				</React.Fragment>
			))}
		</List>
	) : null;
};

export default LevelParser;

import { capitalize } from "@helper/strings";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Organization } from "@myTypes/entity/organization";
import React from "react";
import Divider from "@mui/material/Divider";
import { useOrgAdminStore } from "@store/filter/trans/org.admin.store";
import Typography from "@mui/material/Typography";
import { useKpiAdminStore } from "@store/filter/trans/kpi.admin";

type ItemParserProps = {
	org: Organization;
	selected: string | false;
	handleClick: (value: string | false) => void;
};
const ItemParser = (props: ItemParserProps) => {
	const { org, selected, handleClick } = props;
	return (
		<>
			<ListItemButton
				selected={selected === `orgList${org.id}` ? true : false}
				onClick={() => handleClick(`orgList${org.id}`)}
			>
				<ListItemText>- {capitalize(org.name)}</ListItemText>
			</ListItemButton>
			<Divider />
		</>
	);
};

type LevelParserProps = { data: Organization[]; title: string };
const LevelParser = (props: LevelParserProps) => {
	const { bridgeKpiList, setBridgeKpi } = useKpiAdminStore();
	const { selected, setSelected } = useOrgAdminStore();
	const handleClick = (value: string | false, org: Organization) => {
		const filtered = bridgeKpiList.filter(
			(o) => org.id === o.organizationId
		);
		if (filtered.length === 1) setBridgeKpi(filtered[0]);
		setSelected(selected === value ? false : value);
	};

	return props.data.length > 0 ? (
		<List
			component="div"
			sx={{ m: 1 }}
			subheader={
				<Typography variant="subtitle1" fontWeight="bold">
					{props.title}
				</Typography>
			}
		>
			{props.data.map((org) => (
				<ItemParser
					key={org.id}
					org={org}
					selected={selected}
					handleClick={(v) => handleClick(v, org)}
				/>
			))}
		</List>
	) : null;
};

export default LevelParser;

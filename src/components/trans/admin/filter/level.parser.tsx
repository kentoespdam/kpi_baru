import { capitalize } from "@helper/strings";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Organization } from "@myTypes/entity/organization";
import { useKpiAdminStore } from "@store/filter/trans/kpi.admin";
import { useOrgAdminStore } from "@store/filter/trans/org.admin.store";

type ItemParserProps = {
	org: Organization;
	selected: string | false;
	handleClick: (value: string | false) => void;
};

const ItemParser = (props: ItemParserProps) => {
	return (
		<>
			<ListItemButton
				selected={
					props.selected === `orgList${props.org.id}` ? true : false
				}
				onClick={() => props.handleClick(`orgList${props.org.id}`)}
			>
				<ListItemText>- {capitalize(props.org.name)}</ListItemText>
			</ListItemButton>
		</>
	);
};
type LevelParserProps = {
	data: Organization[];
	title: string;
};
const LevelParser = (props: LevelParserProps) => {
	const { setRootNipam, bridgeKpiList, setBridgeKpi } = useKpiAdminStore();
	const { selected, setSelected } = useOrgAdminStore();
	const handleClick = (value: string | false, org: Organization) => {
		const filtered = bridgeKpiList.filter(
			(br) => org.id === br.organizationId
		);
		if (filtered.length === 1) {
			setRootNipam(filtered[0].nipam);
			setBridgeKpi(filtered[0]);
		}
		setSelected(selected === value ? false : value);
	};
	return props.data.length <= 0 ? null : (
		<List
			component="nav"
			subheader={
				<Typography variant="subtitle1" fontWeight="bold">
					{props.title}
				</Typography>
			}
		>
			<Divider />
			{props.data.map((org) => (
				<ItemParser
					key={org.id}
					org={org}
					selected={selected}
					handleClick={(v) => handleClick(v, org)}
				/>
			))}
		</List>
	);
};

export default LevelParser;

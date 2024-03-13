import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import { Organization } from "@myTypes/entity/organization";
import { useKpiAdminStore } from "@store/filter/trans/kpi.admin";
import { useQueryClient } from "@tanstack/react-query";
import LevelParser from "./level.parser";

const OrgDrawer = () => {
	const { isOrgOpen, setOrgOpen } = useKpiAdminStore();
	const qc = useQueryClient();
	const orgList = qc.getQueryData<Organization[]>(["orgTree"]);
	if (!orgList) return null;
	const cabangOnly = orgList.filter(
		(org: Organization) => org.level === 3 && org.group != "01.DIREKSI"
	);
	const bagianOnly = orgList.filter(
		(org: Organization) =>
			org.level === 4 && org.code.toLowerCase().startsWith("ba")
	);
	return (
		<Drawer
			anchor="right"
			open={isOrgOpen}
			onClose={() => setOrgOpen(false)}
		>
			<Stack direction="column" spacing={1} sx={{ p: 1 }}>
				<LevelParser data={cabangOnly} title="Cabang" />
				<LevelParser data={bagianOnly} title="Bagian" />
			</Stack>
		</Drawer>
	);
};

export default OrgDrawer;

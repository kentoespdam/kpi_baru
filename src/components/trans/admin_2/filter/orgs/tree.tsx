import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getList } from "@utils/eo/organization";
import LevelParser from "./level.parser";
import { Organization } from "@myTypes/entity/organization";
import Stack from "@mui/material/Stack";
import { SxProps, Theme } from "@mui/material/styles";
import { BridgeKpi } from "@myTypes/entity/bridge.kpi";
import { useKpiAdminStore } from "@store/filter/trans/kpi.admin";

export const levelList = (data: Organization[]) => {
	return new Set(
		data.reduce((result: number[], org) => {
			org.level === null ? result.push(0) : result.push(org.level);
			return result;
		}, [])
	);
};

type OrgTreeProps = {
	sx?: SxProps<Theme>;
};
const OrgTree = (props: OrgTreeProps) => {
	const qc = useQueryClient();
	const org = qc.getQueryData<Organization[]>(["orgTree"]);
	if (!org) return null;

	const cabangOnly = org.filter(
		(org: Organization) => org.level === 3 && org.group != "01.DIREKSI"
	);

	const bagianOnly = org.filter(
		(org: Organization) =>
			org.level === 4 && org.code.toLowerCase().startsWith("ba")
	);

	return (
		<Stack direction="column" spacing={1} sx={{ m: 2 }}>
			<LevelParser data={cabangOnly} title="Cabang" />
			<LevelParser data={bagianOnly} title="Bagian" />
		</Stack>
	);
};

export default OrgTree;

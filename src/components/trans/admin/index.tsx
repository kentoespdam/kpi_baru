"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useViewFileDialogStore } from "@store/dialog/view.file";
import { useKpiAdminStore } from "@store/filter/trans/kpi.admin";
import { useQueries } from "@tanstack/react-query";
import ViewFormKinerjaDialog from "@trans/dialog/form/kinerja";
import { getList as getBridgeKpiList } from "@utils/bridge/kpi";
import { getList as getOrgList } from "@utils/eo/organization";
import { getBridgePerilakuList } from "@utils/trans/perilaku";
import ViewFileDialog from "../dialog/file";
import ViewFormPerilakuDialog from "../dialog/form/perilaku";
import ViewPdfDialog from "../dialog/pdf";
import KpiAdminBawahan from "./bawahan";
import KpiAdminDetail from "./detail";
import KpiAdminBiodata from "./detail/biodata";
import KpiAdminFilter from "./filter";

const TransKpiAdminComponent = () => {
	const { periode, rootNipam, bridgeKpi } = useKpiAdminStore();
	const { nipam, kpiId } = useViewFileDialogStore();
	useQueries({
		queries: [
			{ queryKey: ["orgTree"], queryFn: getOrgList },
			{ queryKey: ["kpi.admin.bridge.list"], queryFn: getBridgeKpiList },
			{
				queryKey: ["kpi.admin.bridge.perilaku.list"],
				queryFn: getBridgePerilakuList,
			},
		],
	});
	return (
		<Stack direction="column" spacing={2}>
			<KpiAdminFilter />
			<Card>
				<CardContent>
					<KpiAdminBiodata nipam={rootNipam} />
					<Divider />
					<KpiAdminDetail periode={periode} bridgeKpi={bridgeKpi} />
				</CardContent>
			</Card>
			<KpiAdminBawahan nipam={rootNipam} />

			<ViewFormKinerjaDialog periode={periode} isAdmin />
			<ViewFormPerilakuDialog periode={periode} isAdmin />

			<ViewFileDialog
				isAdmin={true}
				qKeyKpiStaff={[
					"kpi.admin.kinerja",
					{ nipam: nipam, kpiId: kpiId, periode: periode?.periode },
				]}
			/>
			<ViewPdfDialog />
		</Stack>
	);
};

export default TransKpiAdminComponent;

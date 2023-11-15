import TransKpiTabPanel from "@components/trans/bawahan/accordion/tabs/panel";
import TransSkorTable from "@components/trans/bawahan/skor/table";
import { Periode } from "@helper/periode";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Tooltip from "@mui/material/Tooltip";
import { BridgeKpi } from "@myTypes/entity/bridge.kpi";
import { TransKpiQKeyProps } from "@myTypes/entity/trans.kpi";
import { useQueries } from "@tanstack/react-query";
import { getStaffKpi } from "@utils/trans/kpi";
import { getTransPerilaku } from "@utils/trans/perilaku";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import KpiAdminKpi from "../kpi";
import KpiAdminPerilaku from "../perilaku";

const ViewFileDialog = dynamic(() => import("@transDialog/file"));
const ViewPdfDialog = dynamic(() => import("@transDialog/pdf"));
const LocalPrintshopOutlinedIcon = dynamic(
	() => import("@mui/icons-material/LocalPrintshopOutlined")
);

const tabProps = (index: number) => {
	return { "id": `tab-${index}`, "aria-controls": `tabpanel-${index}` };
};

type KpiAdminTabProps = {
	periode: Periode | null;
	bridgeKpi: BridgeKpi | null;
};

const KpiAdminTab = (props: KpiAdminTabProps) => {
	const { periode, bridgeKpi } = props;
	const nipam = bridgeKpi?.nipam;
	const kpiId = bridgeKpi?.kpi.id;
	const levelId = bridgeKpi?.level.id;
	const [tabIndex, setTabIndex] = useState(0);
	const tabHandler = (e: SyntheticEvent, newValue: number) => {
		if (newValue !== 3) setTabIndex(newValue);
	};

	const queryKeyKpi: (string | TransKpiQKeyProps)[] = [
		"kpi.admin.kpi",
		{
			periode: periode?.periode,
			kpiId: bridgeKpi?.kpi.id,
			nipam: bridgeKpi?.nipam ?? null,
		},
	];

	const querKeyPerilaku = [
		"kpi.admin.perilaku",
		{
			nipam: nipam ?? null,
			periode: periode?.periode,
			levelId: levelId,
		},
	];

	useQueries({
		queries: [
			{
				queryKey: queryKeyKpi,
				queryFn: getStaffKpi,
				enabled: !!periode?.periode && !!bridgeKpi?.kpi.id,
				retry: 2,
			},
			{
				queryKey: querKeyPerilaku,
				queryFn: getTransPerilaku,
				enabled: !!nipam && !!periode && !!levelId,
				retry: 2,
			},
		],
	});

	return (
		<>
			<Card sx={{ mb: 2 }}>
				<CardContent sx={{ p: 0 }}>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs
							value={tabIndex}
							onChange={tabHandler}
							aria-label="kpi bawahan tabs"
						>
							<Tab label="Kinerja" {...tabProps(0)} />
							<Tab label="Perilaku" {...tabProps(1)} />
							<Tab label="Skor" {...tabProps(2)} />
							<Tooltip title="Cetak">
								<Tab
									id="tab-link"
									aria-controls="tabpanel-0"
									LinkComponent={Link}
									icon={<LocalPrintshopOutlinedIcon />}
									href={`/cetak/${nipam}/${periode?.periode}/${kpiId}/${levelId}`}
									target="_blank"
								/>
							</Tooltip>
						</Tabs>
					</Box>
					<TransKpiTabPanel value={tabIndex} index={0}>
						<KpiAdminKpi queryKeyKpi={queryKeyKpi} />
					</TransKpiTabPanel>
					<TransKpiTabPanel value={tabIndex} index={1}>
						<KpiAdminPerilaku
							querKeyPerilaku={querKeyPerilaku}
							nipam={nipam ?? null}
							periode={periode}
							levelId={levelId ?? null}
						/>
					</TransKpiTabPanel>
					<TransKpiTabPanel value={tabIndex} index={2}>
						<TransSkorTable
							queryKeyKpi={queryKeyKpi}
							querKeyPerilaku={querKeyPerilaku}
						/>
					</TransKpiTabPanel>
				</CardContent>
			</Card>
			<ViewFileDialog qKeyKpiStaff={queryKeyKpi} />
			<ViewPdfDialog />
		</>
	);
};

export default KpiAdminTab;

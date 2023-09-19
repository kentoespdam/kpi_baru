import TransKpiTabPanel from "@components/trans/bawahan/accordion/tabs/panel";
import { Periode } from "@helper/periode";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Tooltip from "@mui/material/Tooltip";
import { BridgeKpi } from "@myTypes/entity/bridge.kpi";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import KpiAdminKpi from "../kpi";

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
	return (
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
					<KpiAdminKpi periode={periode} bridgeKpi={bridgeKpi} />
				</TransKpiTabPanel>
			</CardContent>
		</Card>
	);
};

export default KpiAdminTab;

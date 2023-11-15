import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Tooltip from "@mui/material/Tooltip";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import { Periode } from "@helper/periode";
import { BridgeKpi } from "@myTypes/entity/bridge.kpi";
import { SyntheticEvent, useState } from "react";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useQueries } from "@tanstack/react-query";
import { getStaffKpi } from "@utils/trans/kpi";
import { getEmpDetails } from "@utils/eo/employee";
import KpiAdminBiodata from "./biodata";
import Divider from "@mui/material/Divider";
import TransKpiTabPanel from "./panel";
import KpiAdminKinerja from "./kinerja";

const tabProps = (index: number) => {
	return { "id": `tab-${index}`, "aria-controls": `tabpanel-${index}` };
};

type KpiAdminTabProps = {
	periode: Periode | null;
	bridgeKpi: BridgeKpi | null;
};

const KpiAdminDetail = (props: KpiAdminTabProps) => {
	const { periode, bridgeKpi } = props;
	const [tabIndex, setTabIndex] = useState(0);

	useQueries({
		queries: [
			{
				queryKey: [
					"kpi.admin.kinerja",
					{
						nipam: bridgeKpi?.nipam,
						kpiId: bridgeKpi?.kpi.id,
						periode: periode?.periode,
					},
				],
				queryFn: getStaffKpi,
				enabled: !!bridgeKpi?.nipam && !!periode?.periode,
			},
			{
				queryKey: ["kpi.admin.biodata", bridgeKpi?.nipam],
				queryFn: getEmpDetails,
				enabled: !!bridgeKpi?.nipam,
			},
		],
	});

	const tabHandler = (e: SyntheticEvent, newValue: number) => {
		if (newValue !== 3) setTabIndex(newValue);
	};

	return (
		<Card>
			<CardContent>
				<KpiAdminBiodata nipam={bridgeKpi?.nipam} />
				<Divider />
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
							href={`/cetak/${bridgeKpi?.nipam}/${periode?.periode}/${bridgeKpi?.kpi.id}/${bridgeKpi?.level.id}`}
							target="_blank"
						/>
					</Tooltip>
				</Tabs>
				<TransKpiTabPanel value={tabIndex} index={0}>
					<KpiAdminKinerja
						nipam={bridgeKpi?.nipam}
						kpiId={bridgeKpi?.kpi.id}
						periode={periode}
					/>
				</TransKpiTabPanel>
				<TransKpiTabPanel value={tabIndex} index={1}>
					Tab 2
				</TransKpiTabPanel>
				<TransKpiTabPanel value={tabIndex} index={2}>
					Tab 3
				</TransKpiTabPanel>
			</CardContent>
		</Card>
	);
};

export default KpiAdminDetail;

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Suspense, SyntheticEvent, lazy, useState } from "react";
import TransKpiTabPanel from "./panel";
import RootLoading from "src/app/loading";

const TransKinerjaTable = lazy(() => import("@trans/bawahan/kinerja/table"));
const TransPerilakuTable = lazy(() => import("@trans/bawahan/perilaku/table"));
const TransSkorTable = lazy(() => import("@trans/bawahan/skor/table"));

const tabProps = (index: number) => {
	return { "id": `tab-${index}`, "aria-controls": `tabpanel-${index}` };
};

const TransKpiBawahanTabs = () => {
	const [tabIndex, setTabIndex] = useState(0);

	const tabHandler = (e: SyntheticEvent, newValue: number) =>
		setTabIndex(newValue);

	return (
		<Card>
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
					</Tabs>
				</Box>
				<TransKpiTabPanel value={tabIndex} index={0}>
					<Suspense fallback={<RootLoading />}>
						<TransKinerjaTable />
					</Suspense>
				</TransKpiTabPanel>
				<TransKpiTabPanel value={tabIndex} index={1}>
					<Suspense fallback={<RootLoading />}>
						<TransPerilakuTable />
					</Suspense>
				</TransKpiTabPanel>{" "}
				<TransKpiTabPanel value={tabIndex} index={2}>
					<Suspense fallback={<RootLoading />}>
						<TransSkorTable />
					</Suspense>
				</TransKpiTabPanel>
			</CardContent>
		</Card>
	);
};

export default TransKpiBawahanTabs;

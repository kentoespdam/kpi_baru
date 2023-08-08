import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { SyntheticEvent, useState } from "react";
import TransKpiTabPanel from "./panel";
import TransKpiKinerja from "@trans/bawahan/kinerja";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

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
					</Tabs>
				</Box>
				<TransKpiTabPanel value={tabIndex} index={0}>
					<TransKpiKinerja />
				</TransKpiTabPanel>
				<TransKpiTabPanel value={tabIndex} index={1}>
					Perilaku
				</TransKpiTabPanel>
			</CardContent>
		</Card>
	);
};

export default TransKpiBawahanTabs;

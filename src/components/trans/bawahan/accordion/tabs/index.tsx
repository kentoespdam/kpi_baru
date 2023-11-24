import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Tooltip from "@mui/material/Tooltip";
import { useTransKinerjaStore } from "@store/filter/trans/kinerja";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import TransKpiTabPanel from "./panel";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TransKpiWithAudit } from "@myTypes/entity/trans.kpi";
import { ACCEPTED_STATUS } from "@myTypes/index";
import { DetEmployee } from "@myTypes/entity/det.employee";
import { getEmpDetails } from "@utils/eo/employee";
import { useSessionStore } from "@store/main/session";
import UnlockDialog from "./unlock.dialog";
import LockDialog from "./lock.dialog";
const TransKinerjaTable = dynamic(() => import("@trans/bawahan/kinerja/table"));
const TransPerilakuTable = dynamic(
	() => import("@trans/bawahan/perilaku/table")
);
const TransSkorTable = dynamic(() => import("@trans/bawahan/skor/table"));
const LocalPrintshopOutlinedIcon = dynamic(
	() => import("@mui/icons-material/LocalPrintshopOutlined")
);

const tabProps = (index: number) => {
	return { "id": `tab-${index}`, "aria-controls": `tabpanel-${index}` };
};

const TransKpiBawahanTabs = () => {
	const { user } = useSessionStore();
	const periode = useTransKpiStore((state) => state.periode);
	const { nipamStaff, bridgeKpiBawahan } = useTransKinerjaStore();
	const [tabIndex, setTabIndex] = useState(0);
	const [lockOpen, setLockOpen] = useState(false);
	const [unlockOpen, setUnlockOpen] = useState(false);

	const handleLockOpen = () => setLockOpen(!lockOpen);
	const handleUnlockOpen = () => setUnlockOpen(!unlockOpen);

	const tabHandler = (e: SyntheticEvent, newValue: number) => {
		if (newValue !== 3) setTabIndex(newValue);
	};

	const qc = useQueryClient();

	const queryKeyKpi = [
		"trans.kpi.bawahan",
		{
			nipam: nipamStaff,
			kpiId: bridgeKpiBawahan?.kpi.id,
			periode: periode?.periode,
		},
	];

	const queryKeyPerilaku = [
		"trans.perilaku.bawahan",
		{
			nipam: nipamStaff,
			periode: periode?.periode,
			levelId: bridgeKpiBawahan?.level.id,
		},
	];

	const trans = qc.getQueryData<TransKpiWithAudit>(queryKeyKpi);

	const doLock = async () => {
		setTabIndex(tabIndex);
		if (trans?.lockedStatus === ACCEPTED_STATUS.UNLOCKED) {
			handleLockOpen();
			return;
		} else {
			if (!user?.prefs.roles?.includes("ADMIN")) {
				if (trans?.lockedStatus !== ACCEPTED_STATUS.ATASAN) {
					alert(
						"Anda tidak memiliki akses untuk melakukan proses ini"
					);
					return;
				}
			}
			handleUnlockOpen();
			return;
		}
	};

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
						<Tooltip title="Cetak">
							<Tab
								id="tab-link"
								aria-controls="tabpanel-0"
								LinkComponent={Link}
								icon={<LocalPrintshopOutlinedIcon />}
								href={`/cetak/${nipamStaff}/${periode?.periode}/${bridgeKpiBawahan?.kpi.id}/${bridgeKpiBawahan?.level.id}`}
								target="_blank"
							/>
						</Tooltip>
						<Tooltip
							title={
								trans?.lockedStatus !== ACCEPTED_STATUS.UNLOCKED
									? trans?.lockedStatus
									: ACCEPTED_STATUS.UNLOCKED
							}
						>
							<Tab
								id="tab-bt"
								aria-controls="tabpanel-0"
								icon={
									trans?.lockedStatus ===
									ACCEPTED_STATUS.UNLOCKED ? (
										<LockOpenOutlinedIcon color="success" />
									) : (
										<LockOutlinedIcon color="error" />
									)
								}
								onClick={doLock}
							/>
						</Tooltip>
					</Tabs>
				</Box>

				<TransKpiTabPanel value={tabIndex} index={0}>
					<TransKinerjaTable queryKeyKpi={queryKeyKpi} />
				</TransKpiTabPanel>

				<TransKpiTabPanel value={tabIndex} index={1}>
					<TransPerilakuTable
						queryKeyKpi={queryKeyKpi}
						queryKeyPerilaku={queryKeyPerilaku}
					/>
				</TransKpiTabPanel>

				<TransKpiTabPanel value={tabIndex} index={2}>
					<TransSkorTable
						queryKeyKpi={queryKeyKpi}
						querKeyPerilaku={queryKeyPerilaku}
					/>
				</TransKpiTabPanel>
			</CardContent>

			<LockDialog
				open={lockOpen}
				queryKey={queryKeyKpi}
				handleLockOpen={handleLockOpen}
				lockedBy={
					user?.prefs.roles?.includes("ADMIN")
						? ACCEPTED_STATUS.ADMIN
						: ACCEPTED_STATUS.ATASAN
				}
			/>
			<UnlockDialog
				open={unlockOpen}
				handleOpen={handleUnlockOpen}
				queryKey={queryKeyKpi}
				lockedBy={
					user?.prefs.roles?.includes("ADMIN")
						? ACCEPTED_STATUS.ADMIN
						: ACCEPTED_STATUS.ATASAN
				}
			/>
		</Card>
	);
};

export default TransKpiBawahanTabs;

import { Periode } from "@helper/periode";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Tooltip from "@mui/material/Tooltip";
import { BridgeKpi } from "@myTypes/entity/bridge.kpi";
import { ACCEPTED_STATUS } from "@myTypes/index";
import { useSessionStore } from "@store/main/session";
import { useQueries } from "@tanstack/react-query";
import { getStaffKpi } from "@utils/trans/kpi";
import { getTransPerilaku } from "@utils/trans/perilaku";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import LockDialog from "./dialog/lock";
import UnlockDialog from "./dialog/unlock";
import KpiAdminKinerja from "./kinerja";
import TransKpiTabPanel from "./panel";
import KpiAdminPerilaku from "./perilaku";
import KpiAdminSkor from "./skor";

const tabProps = (index: number) => {
	return { id: `tab-${index}`, "aria-controls": `tabpanel-${index}` };
};

type KpiAdminTabProps = {
	periode: Periode | null;
	bridgeKpi: BridgeKpi | null;
};

const KpiAdminDetail = (props: KpiAdminTabProps) => {
	const { user } = useSessionStore();
	const { periode, bridgeKpi } = props;
	const _nipam = bridgeKpi?.nipam;
	const _kpiId = bridgeKpi?.kpi.id;
	const _periode = periode?.periode;
	const _levelId = bridgeKpi?.level.id;

	const [tabIndex, setTabIndex] = useState(0);
	const [lockOpen, setLockOpen] = useState(false);
	const [unlockOpen, setUnlockOpen] = useState(false);

	const handleLockOpen = () => setLockOpen(!lockOpen);
	const handleUnlockOpen = () => setUnlockOpen(!unlockOpen);

	const queries = useQueries({
		queries: [
			{
				queryKey: [
					"kpi.admin.kinerja",
					{
						nipam: _nipam,
						kpiId: _kpiId,
						periode: _periode,
					},
				],
				queryFn: getStaffKpi,
				enabled: !!_nipam && !!_kpiId && !!_periode,
			},
			{
				queryKey: [
					"kpi.admin.perilaku",
					{
						nipam: _nipam,
						periode: _periode,
						levelId: _levelId,
					},
				],
				queryFn: getTransPerilaku,
				enabled: !!_nipam && !!_periode && !!_levelId,
			},
		],
	});

	const tabHandler = (e: SyntheticEvent, newValue: number) => {
		if (newValue !== 3) setTabIndex(newValue);
	};

	const lockStatus = queries[0].data?.lockedStatus;
	const doLock = async () => {
		setTabIndex(tabIndex);
		if (
			lockStatus === ACCEPTED_STATUS.UNLOCKED ||
			lockStatus === ACCEPTED_STATUS.ATASAN
		) {
			handleLockOpen();
			return;
		}
		handleUnlockOpen();
		return;
	};

	let lockColor: "success" | "warning" | "error";
	switch (lockStatus) {
		case ACCEPTED_STATUS.ATASAN:
			lockColor = "warning";
			break;
		case ACCEPTED_STATUS.ADMIN:
			lockColor = "error";
			break;
		default:
			lockColor = "success";
			break;
	}
	return (
		<>
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
						href={`/cetak/${_nipam}/${periode?.periode}/${_kpiId}/${_levelId}`}
						target="_blank"
					/>
				</Tooltip>
				<Tooltip title={queries[0].data?.lockedStatus}>
					<Tab
						id="tab-bt"
						aria-controls="tabpanel-0"
						label={queries[0].data?.lockedStatus}
						color={
							queries[0].data?.lockedStatus === ACCEPTED_STATUS.UNLOCKED
								? "success"
								: "error"
						}
						iconPosition="start"
						icon={
							lockStatus === ACCEPTED_STATUS.UNLOCKED ? (
								<LockOpenOutlinedIcon color={lockColor} />
							) : (
								<LockOutlinedIcon color={lockColor} />
							)
						}
						onClick={doLock}
					/>
				</Tooltip>
			</Tabs>
			<TransKpiTabPanel value={tabIndex} index={0}>
				<KpiAdminKinerja nipam={_nipam} kpiId={_kpiId} periode={periode} />
			</TransKpiTabPanel>
			<TransKpiTabPanel value={tabIndex} index={1}>
				<KpiAdminPerilaku
					nipam={_nipam}
					periode={periode}
					levelId={_levelId}
					lockStatus={lockStatus}
				/>
			</TransKpiTabPanel>
			<TransKpiTabPanel value={tabIndex} index={2}>
				<KpiAdminSkor
					nipam={_nipam}
					kpiId={_kpiId}
					periode={periode}
					levelId={_levelId}
				/>
			</TransKpiTabPanel>

			<LockDialog
				open={lockOpen}
				nipam={_nipam}
				kpiId={_kpiId}
				periode={periode}
				handleLockOpen={handleLockOpen}
				lockedBy={
					user?.prefs.roles?.includes("ADMIN")
						? ACCEPTED_STATUS.ADMIN
						: ACCEPTED_STATUS.ATASAN
				}
			/>
			<UnlockDialog
				open={unlockOpen}
				nipam={_nipam}
				kpiId={_kpiId}
				periode={periode}
				handleOpen={handleUnlockOpen}
				lockedBy={
					user?.prefs.roles?.includes("ADMIN")
						? ACCEPTED_STATUS.ADMIN
						: ACCEPTED_STATUS.ATASAN
				}
			/>
		</>
	);
};

export default KpiAdminDetail;
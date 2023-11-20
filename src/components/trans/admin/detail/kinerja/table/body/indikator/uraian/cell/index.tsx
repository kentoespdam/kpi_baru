import CellBuilder from "@components/commons/table/cell.builder";
import ViewBtn from "@components/trans/kpi/staff/button/view";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import { TransUraian } from "@myTypes/entity/trans.uraian";
import { ACCEPTED_STATUS, AcceptedStatus } from "@myTypes/index";
import { useViewFormKinerjaDialogStore } from "@store/dialog/view.form.kinerja";

type KpiAdminKinerjaTableBodyUraianCellProps = {
	nipam: string | null;
	idKpi: number;
	uraian: TransUraian;
	lockedStatus: AcceptedStatus;
};
const KpiAdminKinerjaTableBodyUraianCell = (
	props: KpiAdminKinerjaTableBodyUraianCellProps
) => {
	const { nipam, idKpi, uraian, lockedStatus } = props;
	const theme = useTheme();
	const { fileList } = uraian;

	const editHandler = () => {
		useViewFormKinerjaDialogStore.setState({
			isFormKinerjaOpen: true,
			staffNipam: nipam,
			idKpi: idKpi,
			idUraian: uraian.id,
		});
	};

	return (
		<>
			<CellBuilder value={uraian.uraian} bordered noWrap />
			<CellBuilder value={uraian.volume} bordered />
			<CellBuilder value={uraian.satuan} bordered />
			<CellBuilder value={uraian.waktu} bordered />
			<CellBuilder value={`${uraian.bobot}%`} align="right" bordered />
			<CellBuilder
				value={uraian.capaianVolume}
				sx={{ bgcolor: "yellow" }}
				bordered
			/>
			<CellBuilder value={uraian.capaianSatuan} bordered />
			<CellBuilder
				value={uraian.capaianWaktu}
				sx={{
					bgColor:
						uraian.waktu !== "Akhir Bulan" ? "yellow" : "white",
				}}
				bordered
			/>
			<CellBuilder value={uraian.nilaiProdukKerja} bordered percent />
			<CellBuilder value={uraian.nilaiWaktu} bordered percent />
			<CellBuilder value={uraian.nilaiTotalUraian} bordered percent />
			<TableCell sx={{ border: `1px solid ${theme.palette.divider}` }}>
				<Stack direction="row">
					{lockedStatus === ACCEPTED_STATUS.UNLOCKED ? (
						<Tooltip title="Edit Uraian KPI Bawahan" followCursor>
							<IconButton onClick={editHandler} color="warning">
								<EditIcon />
							</IconButton>
						</Tooltip>
					) : null}
					{fileList.length > 0 ? (
						<ViewBtn
							fileList={fileList}
							uraianId={uraian.id}
							nipam={nipam}
							kpiId={idKpi}
						/>
					) : null}
				</Stack>
			</TableCell>
		</>
	);
};

export default KpiAdminKinerjaTableBodyUraianCell;

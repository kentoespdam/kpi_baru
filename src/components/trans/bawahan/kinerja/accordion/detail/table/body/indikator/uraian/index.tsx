import CellBuilder from "@components/commons/table/cell.builder";
import ViewBtn from "@components/trans/kpi/staff/button/view";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import { TransUraian } from "@myTypes/entity/trans.uraian";
import { useViewFormDialogStore } from "@store/dialog/view.form";

type UraianCellProps = {
	nipamStaff: string | null;
	idKpi: number;
	uraian: TransUraian;
};
const UraianCell = (props: UraianCellProps) => {
	const { nipamStaff, idKpi, uraian } = props;
	const theme = useTheme();
	const { fileList } = uraian;

	const editHandler = () => {
		useViewFormDialogStore.setState({
			isFormOpen: true,
			staffNipam: nipamStaff,
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
			<CellBuilder value={uraian.nilaiProdukKerja} bordered />
			<CellBuilder value={uraian.nilaiWaktu} bordered />
			<CellBuilder value={uraian.nilaiTotalUraian} bordered />
			<TableCell sx={{ border: `1px solid ${theme.palette.divider}` }}>
				<Stack direction="row">
					<Tooltip title="Edit Uraian KPI Bawahan" followCursor>
						<IconButton onClick={editHandler} color="warning">
							<EditIcon />
						</IconButton>
					</Tooltip>
					<ViewBtn fileList={fileList} uraianId={uraian.id} />
				</Stack>
			</TableCell>
		</>
	);
};

type DetailKpiBawahanUraianProps = {
	nipamStaff: string | null;
	idKpi: number;
	uraianList: TransUraian[];
	first?: boolean;
};
const DetailKpiBawahanUraian = (props: DetailKpiBawahanUraianProps) => {
	const { nipamStaff, idKpi, uraianList, first } = props;

	return first ? (
		<UraianCell
			nipamStaff={nipamStaff}
			idKpi={idKpi}
			uraian={uraianList[0]}
		/>
	) : (
		<>
			{uraianList.map((uraian, index) =>
				index === 0 ? null : (
					<TableRow key={index}>
						<UraianCell
							nipamStaff={nipamStaff}
							idKpi={idKpi}
							uraian={uraian}
						/>
					</TableRow>
				)
			)}
		</>
	);
};

export default DetailKpiBawahanUraian;

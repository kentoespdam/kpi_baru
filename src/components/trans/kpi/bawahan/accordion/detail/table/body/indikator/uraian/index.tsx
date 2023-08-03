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

type UraianCellProps = {
	uraian: TransUraian;
};
const UraianCell = (props: UraianCellProps) => {
	const { uraian } = props;
	const theme = useTheme();
	const { fileList } = uraian;

	const editHandler = () => {};

	return (
		<>
			<CellBuilder value={uraian.uraian} bordered noWrap />
			<CellBuilder value={uraian.volume} bordered />
			<CellBuilder value={uraian.satuan} bordered />
			<CellBuilder value={uraian.bobot} bordered />
			<CellBuilder value={uraian.capaianVolume} bordered />
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
	uraianList: TransUraian[];
	first?: boolean;
};
const DetailKpiBawahanUraian = (props: DetailKpiBawahanUraianProps) => {
	const { uraianList, first } = props;

	return first ? (
		<UraianCell uraian={uraianList[0]} />
	) : (
		<>
			{uraianList.map((uraian, index) =>
				index === 0 ? null : (
					<TableRow key={index}>
						<UraianCell uraian={uraian} />
					</TableRow>
				)
			)}
		</>
	);
};

export default DetailKpiBawahanUraian;

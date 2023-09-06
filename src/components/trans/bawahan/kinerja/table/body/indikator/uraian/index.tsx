import { useTheme } from "@mui/material/styles";
import { TransUraian } from "@myTypes/entity/trans.uraian";
import { useViewFormKinerjaDialogStore } from "@store/dialog/view.form.kinerja";
import dynamic from "next/dynamic";

const CellBuilder = dynamic(
	() => import("@components/commons/table/cell.builder")
);
const ViewBtn = dynamic(
	() => import("@components/trans/kpi/staff/button/view")
);
const EditIcon = dynamic(() => import("@mui/icons-material/Edit"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const Stack = dynamic(() => import("@mui/material/Stack"));
const TableCell = dynamic(() => import("@mui/material/TableCell"));
const TableRow = dynamic(() => import("@mui/material/TableRow"));
const Tooltip = dynamic(() => import("@mui/material/Tooltip"));

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
		useViewFormKinerjaDialogStore.setState({
			isFormKinerjaOpen: true,
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
			<CellBuilder value={uraian.nilaiProdukKerja} bordered percent />
			<CellBuilder value={uraian.nilaiWaktu} bordered percent />
			<CellBuilder value={uraian.nilaiTotalUraian} bordered percent />
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
					<TableRow hover key={index}>
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

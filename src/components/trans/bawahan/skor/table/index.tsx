import CellBuilder from "@components/commons/table/cell.builder";
import { hitungRating } from "@helper/hitung";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TransKpi } from "@myTypes/entity/trans.kpi";
import { TransPerilaku } from "@myTypes/entity/trans.perilaku";
import { useTransKinerjaStore } from "@store/filter/trans/kinerja";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useTransPerilakuStore } from "@store/filter/trans/perilaku";
import { useQueryClient } from "@tanstack/react-query";

const TransSkorTable = () => {
	const periode = useTransKpiStore((state) => state.periode);
	const { nipamStaff, bridgeKpiBawahan } = useTransKinerjaStore();
	const levelStaff = useTransPerilakuStore((state) => state.levelStaff);

	const qc = useQueryClient();

	const dataKinerja = qc.getQueryData([
		"trans.kpi.bawahan",
		{
			nipam: nipamStaff,
			kpiId: bridgeKpiBawahan?.kpi.id,
			periode: periode?.periode,
		},
	]) as TransKpi;

	const dataPerilaku = qc.getQueryData([
		"trans.perilaku.bawahan",
		{
			nipam: nipamStaff,
			periode: periode?.periode,
			levelId: levelStaff,
		},
	]) as TransPerilaku;

	const totalKinerja = 0.8 * dataKinerja.nilaiTotal;
	const nilaiPerilaku =
		dataPerilaku.perilakuList.reduce((acc, cur) => acc + cur.nilai, 0) /
		dataPerilaku.perilakuList.length;
	const totalPerilaku = 0.2 * nilaiPerilaku;
	const nilaiRating = totalKinerja + totalPerilaku;

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<CellBuilder bordered value="No." />
						<CellBuilder bordered value="Parameter Kinerja" />
						<CellBuilder bordered value="Nilai " />
						<CellBuilder bordered value="Bobot" />
						<CellBuilder bordered value="Total" />
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<CellBuilder bordered value={1} width={80} />
						<CellBuilder bordered value="KPI" />
						<CellBuilder bordered value={dataKinerja.nilaiTotal} />
						<CellBuilder bordered value={80} />
						<CellBuilder bordered value={totalKinerja} />
					</TableRow>
					<TableRow>
						<CellBuilder bordered value={1} width={80} />
						<CellBuilder bordered value="Kompetensi" />
						<CellBuilder bordered value={nilaiPerilaku} />
						<CellBuilder bordered value={20} />
						<CellBuilder bordered value={totalPerilaku} />
					</TableRow>
				</TableBody>
				<TableHead>
					<TableRow>
						<CellBuilder value="" colSpan={2} />
						<CellBuilder
							bordered
							value="Total Nilai Kinerja"
							colSpan={2}
							sx={{ textAlign: "left" }}
						/>
						<CellBuilder
							bordered
							value={totalKinerja + totalPerilaku}
						/>
					</TableRow>
					<TableRow>
						<CellBuilder value="" colSpan={2} />
						<CellBuilder
							bordered
							value="Rating Kinerja"
							colSpan={2}
							sx={{ textAlign: "left" }}
						/>
						<CellBuilder
							bordered
							value={hitungRating(nilaiRating)}
						/>
					</TableRow>
				</TableHead>
			</Table>
		</TableContainer>
	);
};

export default TransSkorTable;

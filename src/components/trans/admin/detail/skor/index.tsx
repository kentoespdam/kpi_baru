import CellBuilder from "@components/commons/table/cell.builder";
import { hitungRating } from "@helper/hitung";
import { Periode } from "@helper/periode";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TransKpi } from "@myTypes/entity/trans.kpi";
import { TransPerilaku } from "@myTypes/entity/trans.perilaku";
import { useQueryClient } from "@tanstack/react-query";

type KpiAdminSkorProps = {
	nipam?: string;
	kpiId?: number;
	periode: Periode | null;
	levelId?: number;
};
const KpiAdminSkor = (props: KpiAdminSkorProps) => {
	const { nipam, kpiId, periode, levelId } = props;

	const qc = useQueryClient();
	const dataKinerja = qc.getQueryData<TransKpi>([
		"kpi.admin.kinerja",
		{ nipam: nipam, kpiId: kpiId, periode: periode?.periode },
	]);
	const dataPerilaku = qc.getQueryData<TransPerilaku>([
		"kpi.admin.perilaku",
		{
			nipam: nipam,
			periode: periode?.periode,
			levelId: levelId,
		},
	]);

	if (!dataKinerja || !dataPerilaku) return null;

	const totalKinerja = 0.8 * dataKinerja.nilaiTotal;
	const nilaiPerilaku =
		dataPerilaku?.perilakuList.reduce((acc, cur) => acc + cur.nilai, 0) /
		dataPerilaku?.perilakuList.length;
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

export default KpiAdminSkor;

import CellBuilder from "@components/commons/table/cell.builder";
import { hitungTotalNilaiPerilaku } from "@helper/nilaiIndikator";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import {
	TransPerilaku,
	TransPerilakuQKeyProps,
} from "@myTypes/entity/trans.perilaku";
import { useQueryClient } from "@tanstack/react-query";

type TransPerilakuTableFooterProps = {
	queryKey: (string | TransPerilakuQKeyProps)[];
};
const TransPerilakuTableFooter = (props: TransPerilakuTableFooterProps) => {
	const qc = useQueryClient();
	const data = qc.getQueryData<TransPerilaku>(props.queryKey);

	return (
		<TableFooter>
			<TableRow>
				<CellBuilder colSpan={4} bordered>
					<Typography variant="subtitle1" align="right">
						<strong>Total Nilai Perilaku</strong>
					</Typography>
				</CellBuilder>
				<CellBuilder bordered>
					<Typography variant="subtitle1" align="right">
						<strong>
							{!data
								? 0
								: hitungTotalNilaiPerilaku(data.perilakuList)}
						</strong>
					</Typography>
				</CellBuilder>
				<CellBuilder value="" bordered />
			</TableRow>
		</TableFooter>
	);
};

export default TransPerilakuTableFooter;

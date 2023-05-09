import { formatAngka, formatRupiah } from "@helpers/format.helper";
import { IGrade, isGrade } from "@interfaces/IGrade";
import { ILevelWithAudit, isILevelWithAudit } from "@interfaces/ILevel";
import { IOrganization, isOrganization } from "@interfaces/IOrganization";
import { IPosition, isPosition } from "@interfaces/IPosition";
import { IProfesi, isProfesi } from "@interfaces/IProfesi";
import { Chip } from "@mui/material";
import TableCell, { TableCellProps } from "@mui/material/TableCell";

function objectHandler(value: any) {
	if (isILevelWithAudit(value)) {
		const lvl: ILevelWithAudit = value;
		return `[ ${lvl.id} ] ${lvl.level}`;
	}

	if (isOrganization(value)) {
		const org: IOrganization = value;
		return `${org.name}`;
	}

	if (isPosition(value)) {
		const pos: IPosition = value;
		return `${pos.name}`;
	}

	if (isProfesi(value)) {
		const profesi: IProfesi = value;
		return `[ ${profesi.level.level} ] ${profesi.name}`;
	}

	if (isGrade(value)) {
		const grades: IGrade = value;
		return `[ GRADE ${grades.grade} ] ${formatRupiah(grades.tukin)}`;
	}

	return null;
}

type CellBuilderProps = {
	value: string | number | Object;
	chip?: boolean;
	chipColor?: "success" | "error";
	currency?: boolean;
	percent?: boolean;
} & TableCellProps;
const CellBuilder = (props: CellBuilderProps) => {
	const { value, chip, chipColor, currency, percent } = props;

	if (typeof value === "number") {
		return currency ? (
			<TableCell {...props} align="right">
				{formatRupiah(value)}
			</TableCell>
		) : percent ? (
			<TableCell {...props} align="right">
				{formatAngka(value)}%
			</TableCell>
		) : (
			<TableCell {...props} align="right">
				{formatAngka(value)}
			</TableCell>
		);
	}

	if (typeof value === "object") {
		return <TableCell>{objectHandler(value)}</TableCell>;
	}

	return chip ? (
		<TableCell align="center">
			<Chip
				variant="outlined"
				label={String(value)}
				color={chipColor ? chipColor : "success"}
				size="small"
			/>
		</TableCell>
	) : (
		<TableCell {...props}>{String(value)}</TableCell>
	);
};

export default CellBuilder;

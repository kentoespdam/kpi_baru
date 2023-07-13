import Chip from "@mui/material/Chip";
import TableCell, { TableCellProps } from "@mui/material/TableCell";

interface CellBuilderProps extends TableCellProps {
	value: number | string;
	chip?: boolean;
	chipColor?: "success" | "error";
	currency?: boolean;
	percent?: boolean;
}
const CellBuilder = (props: CellBuilderProps) => {
	const { value, chip, chipColor, currency, percent, sx, ...other } = props;
	if (chip)
		return (
			<TableCell align="center">
				<Chip
					variant="outlined"
					label={String(value)}
					color={chipColor ? chipColor : "success"}
					size="small"
				/>
			</TableCell>
		);

	switch (typeof value) {
		case "number":
			return (
				<TableCell sx={{ ...sx, textAlign: "right" }} {...other}>
					{value}
				</TableCell>
			);
		case "string":
			return (
				<TableCell sx={{ ...sx, textAlign: "left" }} {...other}>
					{value}
				</TableCell>
			);
		default:
			return (
				<TableCell sx={{ ...sx, textAlign: "left" }} {...other}>
					{value}
				</TableCell>
			);
	}
};

export default CellBuilder;

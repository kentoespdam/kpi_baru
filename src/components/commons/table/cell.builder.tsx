import TableCell, { TableCellProps } from "@mui/material/TableCell";

interface CellBuilderProps extends TableCellProps {
	value: number | string;
}
const CellBuilder = (props: CellBuilderProps) => {
	const { value, sx, ...other } = props;
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

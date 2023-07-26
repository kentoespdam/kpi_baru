import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { useTheme } from "@mui/material/styles";
import KpiStaffTableBody from "./body";
import KpiStaffTableHead from "./head";

const KpiStaffTable = () => {
	const theme = useTheme();
	return (
		<TableContainer>
			<Table sx={{ border: `solid 1px ${theme.palette.divider}` }}>
				<KpiStaffTableHead />
				<KpiStaffTableBody />
			</Table>
		</TableContainer>
	);
};

export default KpiStaffTable;

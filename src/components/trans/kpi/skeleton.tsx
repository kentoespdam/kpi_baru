import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";

const TransKpiSkeleton = () => {
	const theme = useTheme();
	return (
		<Card>
			<CardContent>
				<Box>
					<Skeleton
						variant="rounded"
						width={210}
						height={40}
						sx={{ mb: 2 }}
					/>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell
										sx={{
											border: `1px solid ${theme.palette.divider}`,
										}}
										width={50}
									>
										<Skeleton variant="text" />
									</TableCell>
									<TableCell
										sx={{
											border: `1px solid ${theme.palette.divider}`,
										}}
									>
										<Skeleton variant="text" width={210} />
									</TableCell>
									<TableCell
										sx={{
											border: `1px solid ${theme.palette.divider}`,
										}}
									>
										<Skeleton variant="text" width={210} />
									</TableCell>
									<TableCell
										sx={{
											border: `1px solid ${theme.palette.divider}`,
										}}
									>
										<Skeleton variant="text" width={100} />
									</TableCell>
									<TableCell
										sx={{
											border: `1px solid ${theme.palette.divider}`,
										}}
									>
										<Skeleton variant="text" width={100} />
									</TableCell>
								</TableRow>
							</TableHead>
						</Table>
					</TableContainer>
				</Box>
			</CardContent>
		</Card>
	);
};

export default TransKpiSkeleton;

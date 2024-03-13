import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const CardEmployeeSkeleton = () => {
	return (
		<Card raised sx={{ width: "100%" }}>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Skeleton variant="circular" width={40} height={40} />
					<Skeleton
						variant="text"
						width={120}
						sx={{ fontSize: 20 }}
					/>
				</Box>
				<Divider sx={{ m: 1 }} />
				<Stack direction="row" justifyContent="flex-end">
					<Skeleton variant="text" width={120} />
				</Stack>
				<Skeleton variant="text" width={200} />
				<Skeleton variant="text" width={200} />
				<Skeleton variant="text" width={200} />
			</CardContent>
		</Card>
	);
};

export default CardEmployeeSkeleton;

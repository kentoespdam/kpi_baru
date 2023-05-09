import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

const DetailSkeleton = () => {
	return (
		<Grid item lg={6} xs={12}>
			<Card raised>
				<CardContent>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<AccountCircleSharpIcon
							color="primary"
							sx={{
								fontSize: 45,
							}}
						/>
						<Skeleton
							variant="text"
							sx={{ fontSize: "1rem", width: "50%" }}
						/>
					</Box>
					<Divider sx={{ m: 1 }} />

					<Stack
						direction="row"
						spacing={2}
						sx={{
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<Skeleton
							variant="text"
							sx={{ fontSize: "1rem", width: "30%" }}
						/>
					</Stack>
					<Skeleton
						variant="text"
						sx={{ fontSize: "1rem", width: "50%" }}
					/>
					<Skeleton
						variant="text"
						sx={{ fontSize: "1rem", width: "70%" }}
					/>
					<Skeleton
						variant="text"
						sx={{ fontSize: "1rem", width: "50%" }}
					/>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default DetailSkeleton;

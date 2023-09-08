import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { DetEmployee } from "@myTypes/entity/det.employee";
import { useSessionStore } from "@store/main/session";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const AccountCircleSharpIcon = dynamic(
	() => import("@mui/icons-material/AccountCircleSharp")
);

const DetailAtasanComponent = () => {
	const curNipam = useSessionStore.getState().user?.userId;
	const qc = useQueryClient();
	const data = qc.getQueryData<DetEmployee>(["employee-detail", curNipam]);

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
					<AccountCircleSharpIcon
						color="primary"
						sx={{
							fontSize: 45,
						}}
					/>
					<Typography
						gutterBottom
						variant="subtitle2"
						component="div"
						sx={{ fontWeight: "bolder", fontSize: 20 }}
					>
						Atasan
					</Typography>
				</Box>
				<Divider sx={{ m: 1 }} />
				<Typography
					variant="body1"
					sx={{ fontWeight: "bold", textAlign: "right" }}
					color="primary"
				>
					{data?.atasan.nipam}
				</Typography>
				<Typography variant="body1" sx={{ textTransform: "uppercase" }}>
					{data?.atasan.nama}
				</Typography>
				<Typography variant="overline" color="text.secondary">
					{data?.atasan.position.name}
				</Typography>
				<Typography variant="subtitle2" color="text.secondary">
					{data?.atasan.organization.name}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default DetailAtasanComponent;

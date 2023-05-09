import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

type DetailEmployeeProps = {
	nipam: string;
	nama: string;
	positionName: string;
	organizationName: string;
	atasan?: boolean;
};
const DetailEmployeeComponent = (props: DetailEmployeeProps) => {
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
						<Typography
							gutterBottom
							variant="subtitle2"
							component="div"
							sx={{ fontWeight: "bolder", fontSize: 20 }}
						>
							{props.atasan ? "Atasan" : "Karyawan Yang dinilai"}
						</Typography>
					</Box>
					<Divider sx={{ m: 1 }} />
					<Typography
						variant="body1"
						sx={{ fontWeight: "bold", textAlign: "right" }}
						color="primary"
					>
						{props.nipam}
					</Typography>
					<Typography
						variant="body1"
						sx={{ textTransform: "uppercase" }}
					>
						{props.nama}
					</Typography>
					<Typography variant="overline" color="text.secondary">
						{props.positionName}
					</Typography>
					<Typography variant="subtitle2" color="text.secondary">
						{props.organizationName}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default DetailEmployeeComponent;

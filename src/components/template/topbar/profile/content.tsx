import LogoutOutlinedIcon from "@ant-design/icons/LogoutOutlined";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { buttonHovered } from "@myConfig/index";
import { useRouter } from "next/navigation";

const ProfileContent = () => {
	const router = useRouter();
	async function handleLogout() {
		// const logout = await fetch("/api/auth/logout", {
		// 	method: "DELETE",
		// });
		router.push("/api/auth/logout");
	}

	return (
		<Paper
			sx={{
				boxShadow: "customShadows.z1",
				width: 290,
				minWidth: 240,
				maxWidth: 290,
			}}
		>
			<Card
				elevation={0}
				sx={{
					"border": "none",
					"borderRadius": 2,
					"borderColor": "grey.A700",
					"boxShadow": "customShadows.z1",
					":hover": "customShadows.z1",
					"& pre": {
						m: 0,
						p: "16px !important",
						fontSize: "0.75rem",
					},
				}}
			>
				<CardContent sx={{ px: 2.5, pt: 3 }}>
					<Grid
						container
						justifyContent="space-between"
						alignContent="center"
					>
						<Grid item>
							<Stack
								direction="row"
								spacing={1.25}
								alignItems="center"
							>
								<Avatar
									alt="User"
									src="/images/avatars/avatar_1.png"
									sx={{
										bgcolor: "white",
										width: 32,
										height: 32,
									}}
								/>
								<Stack>
									<Typography variant="subtitle1">
										User
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
									>
										UI/UX Designer
									</Typography>
								</Stack>
							</Stack>
						</Grid>
						<Grid item>
							<IconButton
								size="large"
								color="secondary"
								onClick={handleLogout}
								sx={{
									"&:hover": {
										bgcolor: buttonHovered,
									},
								}}
							>
								<LogoutOutlinedIcon />
							</IconButton>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Paper>
	);
};

export default ProfileContent;

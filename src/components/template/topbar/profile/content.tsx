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
import { useProfileStore } from "@store/main/menu";
import { useSessionStore } from "@store/main/session";
import { shallow } from "zustand/shallow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import KeyIcon from "@mui/icons-material/Key";
import ListItemButton from "@mui/material/ListItemButton";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";

const ProfileContent = () => {
	const { user, setUser } = useSessionStore(
		(state) => ({
			user: state.user,
			setUser: state.setUser,
		}),
		shallow
	);
	const { setAnchorEl, toggleProfileMenu } = useProfileStore(
		(state) => ({
			setAnchorEl: state.setAnchorEl,
			toggleProfileMenu: state.toggleProfileMenu,
		}),
		shallow
	);
	const router = useRouter();
	async function handleLogout() {
		setUser(null);
		toggleProfileMenu();
		router.push("/api/auth/logout");
		// console.log(user);
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
				<CardContent sx={{ px: 0, py: 0 }}>
					<List>
						<ListItem alignItems="flex-start" sx={{ py: 0 }}>
							<ListItemAvatar>
								<Avatar
									alt="user"
									src="/images/avatars/avatar_1.png"
									sx={{
										bgcolor: "white",
										width: 32,
										height: 32,
									}}
								/>
							</ListItemAvatar>
							<ListItemText
								primary={
									<Typography variant="subtitle1">
										{user?.name}
									</Typography>
								}
								secondary={
									user?.prefs.roles?.includes("admin")
										? "ADMIN"
										: user?.prefs.roles &&
										  user.prefs.roles.length > 0
										? user?.prefs.roles[0]
										: ""
								}
							/>
						</ListItem>
						<ListItem
							alignItems="flex-start"
							secondaryAction={
								<Tooltip title="Change Password">
									<IconButton
										edge="end"
										aria-label="key"
										LinkComponent={Link}
										href="/profile/update/password"
										onClick={toggleProfileMenu}
									>
										<KeyIcon />
									</IconButton>
								</Tooltip>
							}
							sx={{ py: 0 }}
						>
							<ListItemText>Change Password</ListItemText>
						</ListItem>
						<ListItemButton
							alignItems="center"
							sx={{ textAlign: "center" }}
							onClick={handleLogout}
						>
							<ListItemText>
								<Typography variant="subtitle1" color="error">
									Logout <LogoutOutlinedIcon />
								</Typography>
							</ListItemText>
						</ListItemButton>
					</List>
				</CardContent>
			</Card>
		</Paper>
	);
};

export default ProfileContent;

/**
 * <Grid
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
									alt="user"
									src="/images/avatars/avatar_1.png"
									sx={{
										bgcolor: "white",
										width: 32,
										height: 32,
									}}
								/>
								<Stack>
									<Typography variant="subtitle1">
										{user?.name}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
									>
										{user?.prefs.roles?.includes("admin")
											? "ADMIN"
											: user?.prefs.roles![0]}
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
 */

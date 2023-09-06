import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import { USER_ROLE } from "@myTypes/index";
import { useProfileStore } from "@store/main/menu";
import { useSessionStore } from "@store/main/session";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import Avatar1 from "public/images/avatars/avatar_1.png";

const LogoutOutlinedIcon = dynamic(
	() => import("@ant-design/icons/LogoutOutlined")
);
const KeyIcon = dynamic(() => import("@mui/icons-material/Key"));
const Avatar = dynamic(() => import("@mui/material/Avatar"));
const Card = dynamic(() => import("@mui/material/Card"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const List = dynamic(() => import("@mui/material/List"));
const ListItemAvatar = dynamic(() => import("@mui/material/ListItemAvatar"));
const ListItemButton = dynamic(() => import("@mui/material/ListItemButton"));
const ListItemText = dynamic(() => import("@mui/material/ListItemText"));
const Paper = dynamic(() => import("@mui/material/Paper"));
const Typography = dynamic(() => import("@mui/material/Typography"));

const ProfileContent = () => {
	const { user, setUser } = useSessionStore();
	const toggleProfileMenu = useProfileStore(
		(state) => state.toggleProfileMenu
	);
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();

	async function handleLogout() {
		enqueueSnackbar("Logging out...", { variant: "info" });
		axios
			.get("/api/auth/logout")
			.then((res) => {
				setUser(null);
				toggleProfileMenu();
			})
			.finally(() => {
				router.push("/auth");
			});
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
									// src="/images/avatars/avatar_1.png"
									sx={{
										bgcolor: "white",
										width: 32,
										height: 32,
									}}
								>
									<Image
										alt="user"
										src={Avatar1}
										width={32}
										height={32}
										placeholder="blur"
									/>
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={
									<Typography variant="subtitle1">
										{user?.name}
									</Typography>
								}
								secondary={
									user?.prefs.roles?.includes(USER_ROLE.ADMIN)
										? USER_ROLE.ADMIN
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
										target="blank"
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

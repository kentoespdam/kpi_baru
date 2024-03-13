import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { buttonHovered, buttonSelectedColor } from "@myConfig/index";
import { useProfileStore } from "@store/main/menu";
import dynamic from "next/dynamic";
import Image from "next/image";
import ProfilePopper from "./popper";
import avatarImage from "/public/images/avatars/avatar_1.png";
const Avatar = dynamic(() => import("@mui/material/Avatar"));

const ProfileComponent = () => {
	const { anchorEl, setAnchorEl, isOpen, toggleProfileMenu } =
		useProfileStore();
	const canBeOpen = isOpen && Boolean(anchorEl);
	const id = canBeOpen ? "transition-popper" : undefined;

	const handleToggle = (e: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(e.currentTarget);
		toggleProfileMenu();
	};

	return (
		<Box
			sx={{ flexShrink: 0, ml: 0.75 }}
			aria-label="open profile"
			aria-controls={isOpen ? "profile-grow" : undefined}
			aria-haspopup="true"
		>
			<ButtonBase
				sx={{
					"p": 0.25,
					"bgcolor": isOpen ? buttonSelectedColor : "transparent",
					"borderRadius": 1,
					"&:hover": { bgcolor: buttonHovered },
				}}
				aria-label="open profile"
				aria-describedby={id}
				aria-controls={isOpen ? "profile-grow" : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
			>
				<Avatar
					alt="user"
					sx={{ bgcolor: "white", width: 32, height: 32 }}
				>
					<Image src={avatarImage} alt="user" width={32} height={32}/>
				</Avatar>
			</ButtonBase>
			{isOpen ? <ProfilePopper id={id} /> : null}
		</Box>
	);
};

export default ProfileComponent;

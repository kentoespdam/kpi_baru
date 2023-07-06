import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { buttonHovered, buttonSelectedColor } from "@myConfig/index";
import React from "react";
import { useProfileStore } from "src/store/main/menu";
import ProfilePopper from "./popper";

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
				<Stack>
					<Avatar
						alt={"user"}
						src="/images/avatars/avatar_1.png"
						sx={{ bgcolor: "white", width: 32, height: 32 }}
					/>
				</Stack>
			</ButtonBase>
			{isOpen ? <ProfilePopper id={id} /> : null}
		</Box>
	);
};

export default ProfileComponent;

import { useProfileStore } from "@store/main/menu";
import dynamic from "next/dynamic";

const Box = dynamic(() => import("@mui/material/Box"));
const Fade = dynamic(() => import("@mui/material/Fade"));
const Popper = dynamic(() => import("@mui/material/Popper"));
const ProfileContent = dynamic(() => import("./content"));

type ProfilePopperProps = {
	id?: string;
};

const ProfilePopper = (props: ProfilePopperProps) => {
	const { id } = props;
	const { anchorEl, isOpen } = useProfileStore((state) => ({
		anchorEl: state.anchorEl,
		isOpen: state.isOpen,
	}));

	return isOpen ? (
		<Popper
			id={id}
			placement="bottom-end"
			open={isOpen}
			anchorEl={anchorEl}
			role={undefined}
			transition
			disablePortal
			popperOptions={{
				modifiers: [
					{
						name: "offset",
						options: {
							offset: [0, 5],
						},
					},
				],
			}}
		>
			{({ TransitionProps }) => (
				<>
					<Fade
						in={isOpen}
						{...TransitionProps}
						timeout={{
							appear: 0,
							enter: 300,
							exit: 150,
						}}
					>
						<Box sx={{ transformOrigin: "0 0 0" }}>
							<ProfileContent />
						</Box>
					</Fade>
				</>
			)}
		</Popper>
	) : null;
};

export default ProfilePopper;

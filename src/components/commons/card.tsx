"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { Theme, useTheme } from "@mui/material/styles";
import { ChildrenProps } from "@myTypes/index";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AddCircleOutlineOutlinedIcon = dynamic(
	() => import("@mui/icons-material/AddCircleOutlineOutlined"),
	{ ssr: false }
);

const cardSx = (theme: Theme, color?: string) => {
	switch (color) {
		case "primary":
			return {
				borderBottom: `1px solid ${theme.palette.divider}`,
				backgroundColor: theme.palette.primary.main,
				color: theme.palette.primary.contrastText,
			};
		case "secondary":
			return {
				borderBottom: `1px solid ${theme.palette.divider}`,
				backgroundColor: theme.palette.secondary.main,
				color: theme.palette.secondary.contrastText,
			};
		case "success":
			return {
				borderBottom: `1px solid ${theme.palette.divider}`,
				backgroundColor: theme.palette.success.main,
				color: theme.palette.success.contrastText,
			};
		case "error":
			return {
				borderBottom: `1px solid ${theme.palette.divider}`,
				backgroundColor: theme.palette.error.main,
				color: theme.palette.error.contrastText,
			};
		case "warning":
			return {
				borderBottom: `1px solid ${theme.palette.divider}`,
				backgroundColor: theme.palette.warning.main,
				color: theme.palette.warning.contrastText,
			};
		case "info":
			return {
				borderBottom: `1px solid ${theme.palette.divider}`,
				backgroundColor: theme.palette.info.main,
				color: theme.palette.primary.contrastText,
			};

		default:
			return {
				borderBottom: `1px solid ${theme.palette.divider}`,
				backgroundColor: theme.palette.info.main,
				color: theme.palette.info.contrastText,
			};
	}
};

type CardBuilderProps = {
	title: string;
	color?: string;
	square?: boolean;
} & ChildrenProps &
	({ isLink: true; href?: string } | { isLink: false });

const CardBuilder = (props: CardBuilderProps) => {
	const { children, title, color, square, isLink } = props;
	const pathname = usePathname();
	const link = isLink && props.href ? props.href : `${pathname}/add`;
	const theme = useTheme();

	return (
		<Card sx={{ borderRadius: square ? 0 : undefined }}>
			<CardHeader
				title={title}
				action={
					isLink ? (
						<Tooltip title="Add" TransitionComponent={Zoom}>
							<IconButton
								aria-label="addOrEdit"
								LinkComponent={Link}
								href={link}
								color="inherit"
							>
								<AddCircleOutlineOutlinedIcon />
							</IconButton>
						</Tooltip>
					) : null
				}
				sx={{ ...cardSx(theme, color) }}
			/>
			<CardContent>{children}</CardContent>
		</Card>
	);
};

export default CardBuilder;

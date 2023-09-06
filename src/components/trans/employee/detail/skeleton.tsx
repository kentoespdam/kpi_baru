import { useTemplateStore } from "@store/main/template";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Box = dynamic(() => import("@mui/material/Box"));
const Card = dynamic(() => import("@mui/material/Card"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const Divider = dynamic(() => import("@mui/material/Divider"));
const Skeleton = dynamic(() => import("@mui/material/Skeleton"));
const Stack = dynamic(() => import("@mui/material/Stack"));

const CardEmployeeSkeleton = () => {
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
					<Skeleton variant="circular" width={40} height={40} />
					<Skeleton
						variant="text"
						width={120}
						sx={{ fontSize: 20 }}
					/>
				</Box>
				<Divider sx={{ m: 1 }} />
				<Stack direction="row" justifyContent="flex-end">
					<Skeleton variant="text" width={120} />
				</Stack>
				<Skeleton variant="text" width={200} />
				<Skeleton variant="text" width={200} />
				<Skeleton variant="text" width={200} />
			</CardContent>
		</Card>
	);
};

const DetailEmployeeSkeleton = () => {
	const isDesktop = useTemplateStore((state) => state.isDesktop);
	const [direction, setDirection] = useState(false);
	useEffect(() => {
		setDirection(isDesktop);
	}, [isDesktop]);
	return (
		<Stack
			direction={direction ? "row" : "row"}
			justifyContent={direction ? "space-between" : "center"}
			spacing={2}
		>
			<CardEmployeeSkeleton />
			<CardEmployeeSkeleton />
		</Stack>
	);
};

export default DetailEmployeeSkeleton;

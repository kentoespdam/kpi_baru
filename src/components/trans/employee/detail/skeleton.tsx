import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import CardEmployeeSkeleton from "./card.skeleton";

const DetailEmployeeSkeleton = () => {
	const isMobile = useMediaQuery("(max-width:600px)");
	return (
		<Stack
			direction={isMobile ? "column" : "row"}
			justifyContent={isMobile ? "center" : "space-between"}
			spacing={2}
		>
			<CardEmployeeSkeleton />
			<CardEmployeeSkeleton />
		</Stack>
	);
};

export default DetailEmployeeSkeleton;

import { useMediaQuery } from "@mui/material";
import Stack from "@mui/material/Stack";
import DetailEmployeeComponent from "./detail";
import DetailAtasanComponent from "./detail/atasan";

const EmployeeComponent = () => {
	const isMobile = useMediaQuery("(max-width:600px)");
	return (
		<Stack
			direction={isMobile ? "column" : "row"}
			justifyContent={isMobile ? "center" : "space-between"}
			spacing={2}
		>
			<DetailEmployeeComponent />
			<DetailAtasanComponent />
		</Stack>
	);
};

export default EmployeeComponent;

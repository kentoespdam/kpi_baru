import Stack from "@mui/material/Stack";
import { useTemplateStore } from "@store/main/template";
import { useEffect, useState } from "react";
import DetailEmployeeComponent from "./detail";
import DetailAtasanComponent from "./detail/atasan";

const EmployeeComponent = () => {
	const isDesktop = useTemplateStore((state) => state.isDesktop);
	const [direction, setDirection] = useState(false);
	useEffect(() => {
		setDirection(isDesktop);
	}, [isDesktop]);
	return (
		<Stack
			direction={isDesktop ? "row" : "column"}
			justifyContent={direction ? "space-between" : "center"}
			spacing={2}
		>
			<DetailEmployeeComponent />
			<DetailAtasanComponent />
		</Stack>
	);
};

export default EmployeeComponent;

import Stack from "@mui/material/Stack";
import DetailEmployeeComponent from "./detail";
import DetailAtasanComponent from "./detail/atasan";
import { useTemplateStore } from "@store/main/template";
import { useState, useEffect } from "react";
import { shallow } from "zustand/shallow";

const EmployeeComponent = () => {
	const isDesktop = useTemplateStore((state) => state.isDesktop, shallow);
	const [direction, setDirection] = useState(false);
	useEffect(() => {
		setDirection(isDesktop);
	}, [isDesktop]);
	return (
		<Stack
			direction={direction ? "row" : "row"}
			justifyContent={direction ? "space-between" : "center"}
			// alignItems="center"
			spacing={2}
		>
			<DetailEmployeeComponent />
			<DetailAtasanComponent />
		</Stack>
	);
};

export default EmployeeComponent;

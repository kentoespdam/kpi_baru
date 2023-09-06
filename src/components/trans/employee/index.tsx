import { useTemplateStore } from "@store/main/template";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Stack = dynamic(() => import("@mui/material/Stack"));
const DetailEmployeeComponent = dynamic(() => import("./detail"));
const DetailAtasanComponent = dynamic(() => import("./detail/atasan"));

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

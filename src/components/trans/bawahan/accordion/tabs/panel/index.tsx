import { ChildrenProps } from "@myTypes/index";
import dynamic from "next/dynamic";
const Box = dynamic(() => import("@mui/material/Box"));

type TransKpiTabPanelProps = {
	index: number;
	value: number;
} & ChildrenProps;
const TransKpiTabPanel = (props: TransKpiTabPanelProps) => {
	const { children, index, value, ...other } = props;

	return (
		<Box
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			{value === index && children}
		</Box>
	);
};

export default TransKpiTabPanel;

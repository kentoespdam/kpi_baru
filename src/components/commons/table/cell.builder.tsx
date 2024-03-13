"use client";
import { isDecimal, rupiah } from "@helper/number";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import { useTheme } from "@mui/material/styles";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const Chip = dynamic(() => import("@mui/material/Chip"));

const numberBuilder = (num: number, currency?: boolean, percent?: boolean) =>
	currency
		? rupiah(num)
		: percent
		? `${num}%`
		: isDecimal(num)
		? num.toFixed(2)
		: num;

interface CellBuilderProps extends TableCellProps {
	children?: ReactNode;
	value?: number | string;
	chip?: boolean;
	chipColor?: "success" | "error";
	currency?: boolean;
	percent?: boolean;
	bordered?: boolean;
	noWrap?: boolean;
}
const CellBuilder = (props: CellBuilderProps) => {
	const {
		children,
		value,
		chip,
		chipColor,
		currency,
		percent,
		bordered,
		noWrap,
		sx,
		align,
		...other
	} = props;
	const theme = useTheme();

	const borderedSx = {
		border: bordered ? `1px solid ${theme.palette.divider}` : undefined,
	};

	const myStyle = { whiteSpace: noWrap ? "nowrap" : undefined };
	if (children)
		return (
			<TableCell
				sx={{
					...sx,
					...borderedSx,
					whiteSpace: noWrap ? "nowrap" : undefined,
				}}
				align={align ? align : "left"}
				{...other}
			>
				{children}
			</TableCell>
		);

	if (chip)
		return (
			<TableCell
				align={align ? align : "center"}
				sx={{
					...borderedSx,
					whiteSpace: noWrap ? "nowrap" : undefined,
				}}
			>
				<Chip
					variant="outlined"
					label={String(value)}
					color={chipColor ? chipColor : "success"}
					size="small"
				/>
			</TableCell>
		);

	switch (typeof value) {
		case "number":
			return (
				<TableCell
					sx={{
						...sx,
						...borderedSx,
						whiteSpace: noWrap ? "nowrap" : undefined,
					}}
					align={align ? align : "right"}
					{...other}
				>
					{numberBuilder(value, currency, percent)}
				</TableCell>
			);
		case "string":
			return (
				<TableCell
					sx={{
						...sx,
						...borderedSx,
						whiteSpace: noWrap ? "nowrap" : undefined,
					}}
					align={align ? align : "left"}
					{...other}
				>
					{value}
				</TableCell>
			);
		default:
			return (
				<TableCell
					sx={{
						...sx,
						...borderedSx,
						whiteSpace: noWrap ? "nowrap" : undefined,
					}}
					align={align ? align : "left"}
					{...other}
				>
					{value}
				</TableCell>
			);
	}
};

export default CellBuilder;

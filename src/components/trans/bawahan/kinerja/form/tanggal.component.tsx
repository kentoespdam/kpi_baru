import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { TanggalComponentProps, TextField } from ".";

export const TanggalComponent = (props: TanggalComponentProps) => {
	const { inputRef, tarWaktu, capWaktu } = props;
	const tanggalKosong = tarWaktu?.toLowerCase().includes("tanggal");
	const [cusTanggal, setCusTanggal] = React.useState<Dayjs | null>(
		tanggalKosong ? dayjs(new Date()) : dayjs(capWaktu)
	);

	if (tarWaktu === null || tarWaktu === undefined) return null;

	if (tarWaktu === "Akhir Bulan")
		return (
			<TextField
				id="waktu"
				inputRef={inputRef}
				value={capWaktu}
				aria-readonly />
		);

	if (tarWaktu.includes("Tanggal"))
		return (
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DatePicker
					inputRef={inputRef}
					defaultValue={cusTanggal}
					onChange={setCusTanggal}
					format="YYYY-MM-DD" />
			</LocalizationProvider>
		);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DatePicker
				inputRef={inputRef}
				value={dayjs(tarWaktu)}
				onChange={setCusTanggal}
				format="YYYY-MM-DD"
				readOnly />
		</LocalizationProvider>
	);
};

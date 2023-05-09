import FormDialog from "@commons/components/form.dialog";
import { getHelper } from "@helpers/useAsync";
import { LOCAL_BRIDGE_KPI_PEGAWAI } from "@interfaces/IBridgeKpiPegawai";
import { IEmployee } from "@interfaces/IEmployee";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
import React from "react";
import { AccordionKinerja } from "./table/kinerja";
import KpiStaffForm from "./table/kinerja/form.edit";
import AccordionPerilaku from "./table/perilaku";
import PerilakuNilaiForm from "./table/perilaku/form.edit";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

type AccordionStaffProps = {
	employee: IEmployee;
};
const AccordionStaff = (props: AccordionStaffProps) => {
	const { employee } = props;
	const { isInitialLoading, isLoading, isError, data, error } = useQuery({
		queryKey: ["staff-detail", employee.nipam],
		queryFn: async () => {
			const result = await getHelper(
				`${LOCAL_BRIDGE_KPI_PEGAWAI}/nipam/${employee.nipam}`
			);
			return result;
		},
		enabled: employee.nipam !== undefined,
	});
	const [value, setValue] = React.useState("1");

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>{JSON.stringify(error)}</div>;
	const kpiId = data.status === "OK" ? data.data.kpi.id : data.status;

	function handleChange(event: React.SyntheticEvent, newValue: string) {
		setValue(newValue);
	}

	return (
		<Accordion TransitionProps={{ unmountOnExit: true }}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Stack direction="row" spacing={2}>
					<Typography>{employee.nipam}</Typography>
					<Typography>{employee.nama}</Typography>
				</Stack>
			</AccordionSummary>

			<Box>
				<TabContext value={value}>
					<Box
						sx={{
							borderBottom: 1,
							borderColor: "divider",
							pl: 2,
							pr: 2,
						}}
					>
						<TabList
							onChange={handleChange}
							aria-label="lab API tabs example"
						>
							<Tab label="Kinerja" value="1" />
							<Tab label="Perilaku" value="2" />
						</TabList>
					</Box>
					<TabPanel value="1" sx={{ p: 0 }}>
						<QueryClientProvider client={queryClient}>
							<AccordionKinerja
								nipam={employee.nipam}
								kpiId={kpiId}
							/>
						</QueryClientProvider>
						<FormDialog
							title="Edit Nilai Capaian Kinerja"
							form={<KpiStaffForm />}
						/>
					</TabPanel>
					<TabPanel value="2" sx={{ p: 0 }}>
						<QueryClientProvider client={queryClient}>
							<AccordionPerilaku
								nipam={employee.nipam}
								level={data.data?.level.id}
							/>
						</QueryClientProvider>
						<FormDialog
							title="Edit Nilai Perilaku"
							form={<PerilakuNilaiForm />}
						/>
					</TabPanel>
				</TabContext>
			</Box>
		</Accordion>
	);
};

export default AccordionStaff;

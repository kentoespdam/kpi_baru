"use client";

import { IEmployee } from "@interfaces/IEmployee";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTransactionKpiStore } from "@storage/transaction/kpi.store";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
import { getEmployeeByPosition } from "@utils/get.employee";
import { useSession } from "next-auth/react";
import { shallow } from "zustand/shallow";
import UraianFileViewDialog from "./dialog/file.view.dialog";
import KpiUploadDialog from "./dialog/upload.dialog";
import DetailEmployeeComponent from "./employee-detail/detail.component";
import KpiAtasanComponent from "./kpi-component/atasan";
import KpiStaffComponent from "./kpi-component/staff";
import PeriodeComponent from "./periode.component";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

type FetchDataProps = {
	employee: IEmployee;
};
const FetchData = (props: FetchDataProps) => {
	const { employee } = props;
	const { setEmployee, setAtasan } = useTransactionKpiStore(
		(state) => ({
			setEmployee: state.setEmployee,
			setAtasan: state.setAtasan,
		}),
		shallow
	);
	const { isInitialLoading, isLoading, isError, error, data } = useQuery({
		queryKey: ["trans-kpi", employee.nipam],
		queryFn: async () => {
			const req = await getEmployeeByPosition(employee.position.parent);
			setEmployee(employee);
			setAtasan(req.data);
			return req;
		},
		enabled: employee !== undefined,
	});
	if (isInitialLoading) return <>Loading...</>;
	if (isLoading) return <>Loading...</>;
	if (isError) return <>Error: {JSON.stringify(error, null, 2)}</>;

	return (
		<QueryClientProvider client={queryClient}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant="h6" component="h6" align="center">
						Penilaian Pencapaian Kinerja Individu
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Stack direction="row" spacing={2}>
						<DetailEmployeeComponent
							nipam={employee.nipam}
							nama={employee.nama}
							positionName={employee.position.name}
							organizationName={employee.organization.name}
						/>
						<DetailEmployeeComponent
							nipam={data.data.nipam}
							nama={data.data.nama}
							positionName={data.data.position.name}
							organizationName={data.data.organization.name}
							atasan
						/>
					</Stack>
				</Grid>
				<Grid item xs={12}>
					<Paper elevation={5} sx={{ width: "100%", p: 1 }}>
						<PeriodeComponent />
						<Divider />
						<KpiStaffComponent />
					</Paper>
				</Grid>
				{employee!.position.level < 6 && (
					<Grid item xs={12}>
						<Paper elevation={5} sx={{ width: "100%", p: 1 }}>
							<Typography variant="h6" component="h6">
								Staff
							</Typography>
							<Divider />
							<KpiAtasanComponent />
						</Paper>
					</Grid>
				)}
				<KpiUploadDialog />
				<UraianFileViewDialog />
			</Grid>
		</QueryClientProvider>
	);
};

const KpiTransactionComponent = () => {
	const session = useSession();

	if (session?.data?.user?.employee === undefined) return null;
	const employee = session.data.user.employee;

	return (
		<QueryClientProvider client={queryClient}>
			<FetchData employee={employee} />
		</QueryClientProvider>
	);
};

export default KpiTransactionComponent;

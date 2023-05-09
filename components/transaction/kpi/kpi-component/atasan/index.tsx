import { getHelper } from "@helpers/useAsync";
import { IEmployee, LOCAL_EMPLOYEE } from "@interfaces/IEmployee";
import { useTransactionKpiStore } from "@storage/transaction/kpi.store";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
import { shallow } from "zustand/shallow";
import AccordionStaff from "./accordion";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const KpiAtasanComponent = () => {
	const employee = useTransactionKpiStore((state) => state.employee, shallow);
	const { isInitialLoading, isLoading, isError, data, error } = useQuery<
		IEmployee[]
	>({
		queryKey: ["staff-list", employee?.position.id],
		queryFn: async () => {
			const url = `${LOCAL_EMPLOYEE}/staff/by-position/${
				employee!.position.id
			}`;
			const response = await getHelper(url);
			return response.data;
		},
		enabled: employee !== undefined,
	});

	if (isLoading) return <></>;
	if (isInitialLoading) return <div>Loading...</div>;
	if (isError) return <div>{JSON.stringify(error)}</div>;
	if (data === undefined) return <div>Staff Not Found!</div>;

	return (
		<>
			{data.map((employee, index) => (
				<QueryClientProvider client={queryClient} key={index}>
					<AccordionStaff employee={employee} />
				</QueryClientProvider>
			))}
		</>
	);
};

export default KpiAtasanComponent;

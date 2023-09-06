"use client";

import { useKpiStore } from "@store/filter/master/kpi";
import { useQueries } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { getPage } from "src/utils/master/kpi";

const KpiFilter = dynamic(() => import("./filter"));
const Divider = dynamic(() => import("@mui/material/Divider"));
const LinearProgress = dynamic(() => import("@mui/material/LinearProgress"));
const KpiAccordion = dynamic(() => import("./accordion"));
const KpiPagination = dynamic(() => import("./pagination"));

const KpiComponent = () => {
	const {
		loading,
		pageRequest,
		sortRequest,
		organization,
		position,
		profesi,
		name,
		grade,
		status,
	} = useKpiStore();
	const queries = useQueries({
		queries: [
			{
				queryKey: [
					"master.kpi",
					{ pageRequest, sortRequest },
					{
						organization,
						position,
						profesi,
						name,
						grade,
						status,
					},
				],
				queryFn: getPage,
			},
		],
	});

	return (
		<>
			<KpiFilter />
			<Divider sx={{ my: 1 }} />
			{queries[0].isLoading || queries[0].isFetching ? (
				<LinearProgress sx={{ mb: 1 }} />
			) : null}
			{queries[0].error ? (
				<>KPI Not Found!</>
			) : (
				<>
					<KpiAccordion />
					<KpiPagination />
				</>
			)}
		</>
	);
};

export default KpiComponent;

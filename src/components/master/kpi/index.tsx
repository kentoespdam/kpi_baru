"use client";

import { useKpiStore } from "@store/filter/master/kpi";
import { useQueries } from "@tanstack/react-query";
import { getPage } from "src/utils/master/kpi";
import KpiFilter from "./filter";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import KpiAccordion from "./accordion";
import KpiPagination from "./pagination";

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
			{loading ? <LinearProgress sx={{ mb: 1 }} /> : null}
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

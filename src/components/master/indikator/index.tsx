import CardBuilder from "@components/commons/card";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { useIndikatorStore } from "@store/filter/master/indikator";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { getPage } from "src/utils/master/indikator";
import IndikatorFilter from "./filter";
const IndikatorAccordion = dynamic(() => import("./accordion"));

const IndikatorComponent = () => {
	const { pageRequest, sortRequest, kpiId, indikator, status } =
		useIndikatorStore();
	const { isFetching, data, error } = useQuery({
		queryKey: [
			"master.indikator",
			{ pageRequest, sortRequest },
			{ kpiId, indikator, status },
		],
		queryFn: getPage,
		enabled: !!kpiId,
		retry: 1,
	});
	return (
		<CardBuilder
			title="Master Indikator"
			isLink={true}
			href={`/master/indikator/add/${kpiId}`}
			color="success"
			square={true}
		>
			<IndikatorFilter />
			{isFetching ? <LinearProgress sx={{ my: 1 }} /> : null}
			{error ? (
				<Typography variant="subtitle1" color="error">
					Indikator Not Found!
				</Typography>
			) : data ? (
				<IndikatorAccordion />
			) : null}
		</CardBuilder>
	);
};

export default IndikatorComponent;

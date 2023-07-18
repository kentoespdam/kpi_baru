"use client";

import CardBuilder from "@components/commons/card";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { useUraianStore } from "@store/filter/master/uraian";
import { useQuery } from "@tanstack/react-query";
import { getPage } from "src/utils/master/uraian";
import UraianFilter from "./filter";
import UraianList from "./list";

const UraianComponents = () => {
	const {
		pageRequest,
		sortRequest,
		indikatorId,
		uraian,
		kpiId,
		profesiId,
		levelId,
		status,
	} = useUraianStore();

	const { isFetching, error, data } = useQuery({
		queryKey: [
			"master.uraian",
			{ pageRequest, sortRequest },
			{ indikatorId, uraian, kpiId, profesiId, levelId, status },
		],
		enabled: !!indikatorId,
		queryFn: getPage,
		retry: 1,
	});

	return (
		<CardBuilder
			title="Master Indikator"
			isLink={true}
			href={`/master/indikator/add/${kpiId}`}
			color="primary"
			square={true}
		>
			<UraianFilter />
			{isFetching ? <LinearProgress sx={{ my: 1 }} /> : null}
			{error ? (
				<Typography variant="subtitle1" color="error">
					Indikator Not Found!
				</Typography>
			) : data ? (
				<UraianList />
			) : null}
		</CardBuilder>
	);
};

export default UraianComponents;

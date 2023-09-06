"use client";
import { useUraianStore } from "@store/filter/master/uraian";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { getPage } from "src/utils/master/uraian";

const CardBuilder = dynamic(() => import("@components/commons/card"));
const LinearProgress = dynamic(() => import("@mui/material/LinearProgress"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const UraianFilter = dynamic(() => import("./filter"));
const UraianList = dynamic(() => import("./list"));

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
			title="Master Uraian"
			isLink={true}
			href={`/master/uraian/add/${indikatorId}/${kpiId}`}
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

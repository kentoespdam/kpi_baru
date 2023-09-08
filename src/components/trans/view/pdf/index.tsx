"use client";
import LinearProgress from "@mui/material/LinearProgress";
import { LOCAL_URAIAN_FILE } from "@myTypes/entity/uraian.file";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ViewPdfComponentProps = { id: number };
const ViewPdfComponent = (props: ViewPdfComponentProps) => {
	const { id } = props;
	const defaultPlugin = defaultLayoutPlugin();

	const { isFetching, data } = useQuery({
		queryKey: ["uraian.file", id],
		queryFn: async () => {
			const result = await axios
				.get(`${LOCAL_URAIAN_FILE}/download/${id}`, {
					responseType: "blob",
				})
				.then((res) => res.data);

			return URL.createObjectURL(result);
		},
		enabled: !!id,
	});

	if (isFetching) return <LinearProgress />;
	if (!data) return <div>No data</div>;

	return (
		<Worker workerUrl="/js/pdfjs-dist/build/pdf.worker.min.js">
			<Viewer fileUrl={data} plugins={[defaultPlugin]} />
		</Worker>
	);
};

export default ViewPdfComponent;

"use client";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import { LOCAL_URAIAN_FILE } from "@myTypes/entity/uraian.file";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

type ViewPdfComponentProps = { id: number };
const ViewPdfComponent = (props: ViewPdfComponentProps) => {
	const { id } = props;

	return (
		<Worker workerUrl="/js/pdfjs-dist/build/pdf.worker.min.js">
			<Viewer
				fileUrl={String(`${LOCAL_URAIAN_FILE}/download/${id}`)}
				plugins={[defaultLayoutPlugin()]}
			/>
		</Worker>
	);
};

export default ViewPdfComponent;

import DialogContent from "@mui/material/DialogContent";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { DialogTransition } from "@commons/components/form.dialog";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useViewFileStore } from "@storage/transaction/view.file.store";
import { shallow } from "zustand/shallow";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export interface DialogTitleProps {
	id: string;
	children?: React.ReactNode;
	onClose: () => void;
}
function BootstrapDialogTitle(props: DialogTitleProps) {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
}

const UraianFileViewDialog = () => {
	const { isViewOpen, fileUrl, toggleView } = useViewFileStore(
		(state) => ({
			isViewOpen: state.isViewOpen,
			fileUrl: state.fileUrl,
			toggleView: state.toggleView,
		}),
		shallow
	);

	return (
		<Dialog
			fullScreen
			open={isViewOpen}
			onClose={() => toggleView()}
			TransitionComponent={DialogTransition}
		>
			<BootstrapDialogTitle
				id="customized-dialog-title"
				onClose={() => toggleView()}
			>
				View File
			</BootstrapDialogTitle>
			<DialogContent>
				{/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js"> */}
				<Worker workerUrl={`/js/pdfjs-dist/build/pdf.worker.min.js`}>
					<Viewer
						fileUrl={String(fileUrl)}
						plugins={[defaultLayoutPlugin()]}
					/>
				</Worker>
			</DialogContent>
		</Dialog>
	);
};

export default UraianFileViewDialog;

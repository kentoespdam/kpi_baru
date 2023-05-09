import { DialogTransition } from "@commons/components/form.dialog";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useUploadDialogStore } from "@storage/transaction/upload.dialog.store";
import { shallow } from "zustand/shallow";
import UraianFileListComponent from "./file.list";
import UploadForm from "./upload.form";

const KpiUploadDialog = () => {
	const { title, formUpload, isUploadOpen, toggleUpload } =
		useUploadDialogStore(
			(state) => ({
				title: state.title,
				formUpload: state.formUpload,
				isUploadOpen: state.isUploadOpen,
				toggleUpload: state.toggleUpload,
			}),
			shallow
		);
	function handleClose() {
		toggleUpload();
	}
	return (
		<Dialog
			fullWidth={true}
			open={isUploadOpen}
			onClose={handleClose}
			TransitionComponent={DialogTransition}
		>
			<DialogTitle>{title}</DialogTitle>
			{formUpload ? <UploadForm /> : <UraianFileListComponent />}
		</Dialog>
	);
};

export default KpiUploadDialog;

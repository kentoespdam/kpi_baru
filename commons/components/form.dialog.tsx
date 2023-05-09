import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormDialogStore } from "@storage/form.dialog.store";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { shallow } from "zustand/shallow";

export const DialogTransition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

type FormDialogProps = {
	title: string;
	form: JSX.Element;
};

const FormDialog = ({ title, form }: FormDialogProps) => {
	const { isDialogOpen, toggleDialog } = useFormDialogStore(
		(state) => ({
			isDialogOpen: state.isDialogOpen,
			toggleDialog: state.toggleDialog,
		}),
		shallow
	);
	return (
		<Dialog
			fullWidth={true}
			open={isDialogOpen}
			onClose={toggleDialog}
			TransitionComponent={DialogTransition}
		>
			<DialogTitle>{title}</DialogTitle>
			{form}
		</Dialog>
	);
};

export default FormDialog;

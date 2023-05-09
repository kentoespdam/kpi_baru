import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import Add from "@mui/icons-material/Add";
import { EAuditStatus } from "@commons/interfaces/ICommons";

type AddButtonProps = {
	toggleDialog: () => void;
	setForm?: (form: any) => void;
	setAction?: (action: string) => void;
	actionString?: string;
};
const AddButton = (props: AddButtonProps) => {
	const { toggleDialog, setForm, setAction, actionString } = props;

	function clickHandler() {
		if (setForm) setForm({ status: EAuditStatus.Enabled });
		if (setAction) setAction(actionString || "create");
		toggleDialog();
	}

	return (
		<Tooltip
			title="Add Data"
			sx={{
				m: 0,
				top: "auto",
				right: 20,
				bottom: 20,
				left: "auto",
				position: "fixed",
			}}
		>
			<Fab color="primary" aria-label="add" onClick={clickHandler}>
				<Add />
			</Fab>
		</Tooltip>
	);
};

export default AddButton;

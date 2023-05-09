import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

type EditBtnProps = {
	editHandler: () => void;
};
const EditBtn = (props: EditBtnProps) => {
	const { editHandler } = props;

	return (
		<Tooltip title="Edit" followCursor>
			<IconButton color="primary" size="small" onClick={editHandler}>
				<EditIcon />
			</IconButton>
		</Tooltip>
	);
};

export default EditBtn;

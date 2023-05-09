import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type DeleteBtnProps = {
	deleteHandler: () => void;
};
const DeleteBtn = (props: DeleteBtnProps) => {
	const { deleteHandler } = props;

	return (
		<Tooltip title="Delete" followCursor>
			<IconButton color="error" size="small" onClick={deleteHandler}>
				<HighlightOffIcon />
			</IconButton>
		</Tooltip>
	);
};

export default DeleteBtn;

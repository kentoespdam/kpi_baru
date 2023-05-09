import Stack from "@mui/material/Stack";
import DeleteBtn from "./delete.button";
import EditBtn from "./edit.button";

type BtnActionProps = {
	deleteHandler: () => void;
	editHandler: () => void;
};
const BtnAction = (props: BtnActionProps) => {
	const { deleteHandler, editHandler } = props;
	return (
		<Stack
			direction="row"
			spacing={1}
			sx={{ display: "flex", justifyContent: "center" }}
		>
			<DeleteBtn deleteHandler={deleteHandler} />
			<EditBtn editHandler={editHandler} />
		</Stack>
	);
};

export default BtnAction;

import BtnActionBuilder from "@components/commons/table/action/button.builder";
import { LevelWithAudit } from "@myTypes/entity/level";
import { useLevelStore } from "@store/filter/master/level";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { doDelete } from "src/utils/master/level";

type LevelActionBtnProps = {
	row: LevelWithAudit;
};

const LevelActionBtn = (props: LevelActionBtnProps) => {
	const { row } = props;
	const router = useRouter();
	const { pageRequest, sortRequest, status, level } = useLevelStore(
		(state) => ({
			pageRequest: state.pageRequest,
			sortRequest: state.sortRequest,
			status: state.status,
			level: state.level,
		})
	);
	const qc = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	const mutation = useMutation({
		mutationFn: doDelete,
		onError: (error) => {
			enqueueSnackbar(`${error}`, { variant: "error" });
		},
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [
					"master.level",
					{ pageRequest, sortRequest, status, level },
				],
			});
			enqueueSnackbar("Data berhasil dihapus", { variant: "success" });
			router.push("/master/level");
		},
	});

	const editHandler = async () => router.push(`/master/level/edit/${row.id}`);

	const deleteHandler = async () => {
		const x = confirm("Apakah anda yakin ingin menghapus level ini?");
		if (!x) return;
		mutation.mutate(row.id);
	};

	return (
		<BtnActionBuilder
			editHandler={editHandler}
			deleteHandler={deleteHandler}
		/>
	);
};

export default LevelActionBtn;

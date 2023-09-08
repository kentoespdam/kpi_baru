import BtnActionBuilder from "@components/commons/table/action/button.builder";
import { GradeWithAudit } from "@myTypes/entity/grade";
import { useGradeStore } from "@store/filter/master/grade";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { doDelete } from "src/utils/master/grade";

type GradeActionBtnProps = {
	row: GradeWithAudit;
};

const GradeActionBtn = (props: GradeActionBtnProps) => {
	const { row } = props;
	const router = useRouter();
	const { pageRequest, sortRequest, status, grade, tukin, level } =
		useGradeStore();
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
					"master.grade",
					{ pageRequest, sortRequest },
					{ status, grade, tukin, level },
				],
			});
			enqueueSnackbar("Data berhasil dihapus", { variant: "success" });
			router.push("/master/grade");
		},
	});

	const editHandler = async () => router.push(`/master/grade/edit/${row.id}`);

	const deleteHandler = async () => {
		const x = confirm("Apakah anda yakin ingin menghapus grade ini?");
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

export default GradeActionBtn;

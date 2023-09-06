import { ProfesiWithAudit } from "@myTypes/entity/profesi";
import { useProfesiStore } from "@store/filter/master/profesi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { doDelete } from "src/utils/master/profesi";

const BtnActionBuilder = dynamic(
	() => import("@components/commons/table/action/button.builder")
);

type ProfesiActionBtnProps = {
	row: ProfesiWithAudit;
};

const ProfesiActionBtn = (props: ProfesiActionBtnProps) => {
	const { row } = props;
	const router = useRouter();
	const { pageRequest, sortRequest, status, name, level } = useProfesiStore();
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
					"master.profesi",
					{ pageRequest, sortRequest },
					{ status, name, level },
				],
			});
			enqueueSnackbar("Data berhasil dihapus", { variant: "success" });
			router.push("/master/profesi");
		},
	});

	const editHandler = async () =>
		router.push(`/master/profesi/edit/${row.id}`);

	const deleteHandler = async () => {
		const x = confirm("Apakah anda yakin ingin menghapus profesi ini?");
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

export default ProfesiActionBtn;

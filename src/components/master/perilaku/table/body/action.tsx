import { PerilakuWithAudit } from "@myTypes/entity/perilaku";
import { usePerilakuStore } from "@store/filter/master/perilaku";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { doDelete } from "src/utils/master/perilaku";

const BtnActionBuilder = dynamic(
	() => import("@components/commons/table/action/button.builder")
);

type PerilakuActionBtnProps = {
	row: PerilakuWithAudit;
};

const PerilakuActionBtn = (props: PerilakuActionBtnProps) => {
	const { row } = props;
	const router = useRouter();
	const { pageRequest, sortRequest, status, kompetensi, uraian } =
		usePerilakuStore();
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
					"master.perilaku",
					{ pageRequest, sortRequest },
					{ status, kompetensi, uraian },
				],
			});
			enqueueSnackbar("Data berhasil dihapus", { variant: "success" });
			router.push("/master/perilaku");
		},
	});

	const editHandler = async () =>
		router.push(`/master/perilaku/edit/${row.id}`);

	const deleteHandler = async () => {
		const x = confirm("Apakah anda yakin ingin menghapus perilaku ini?");
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

export default PerilakuActionBtn;

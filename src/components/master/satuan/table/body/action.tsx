import { SatuanWithAudit } from "@myTypes/entity/satuan";
import { useSatuanStore } from "@store/filter/master/satuan";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doDelete } from "@utils/master/satuan";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

const BtnActionBuilder = dynamic(
	() => import("@components/commons/table/action/button.builder")
);

type SatuanActionBtnProps = {
	row: SatuanWithAudit;
};

const SatuanActionBtn = (props: SatuanActionBtnProps) => {
	const { row } = props;
	const router = useRouter();
	const { pageRequest, sortRequest, status, satuan } = useSatuanStore();

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
					"master.satuan",
					{ pageRequest, sortRequest, status, satuan },
				],
			});
			enqueueSnackbar("Data berhasil dihapus", { variant: "success" });
			router.push("/master/satuan");
		},
	});

	const editHandler = async () =>
		router.push(`/master/satuan/edit/${row.id}`);
	const deleteHandler = async () => {
		const x = confirm("Apakah anda yakin ingin menghapus satuan ini?");
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

export default SatuanActionBtn;

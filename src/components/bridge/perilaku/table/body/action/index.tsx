import { BridgePerilakuWithAudit } from "@myTypes/entity/bridge.perilaku";
import { useBridgePerilakuStore } from "@store/filter/bridge/perilaku";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doDelete } from "@utils/bridge/perilaku";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

const BtnActionBuilder = dynamic(
	() => import("@components/commons/table/action/button.builder")
);

type BridgePerilakuActionButtonsProps = {
	row: BridgePerilakuWithAudit;
};
const BridgePerilakuActionButtons = (
	props: BridgePerilakuActionButtonsProps
) => {
	const { row } = props;
	const router = useRouter();
	const { pageRequest, sortRequest, perilaku, level, status } =
		useBridgePerilakuStore();
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
					"bridge.perilaku",
					{ pageRequest, sortRequest },
					{ perilaku, level, status },
				],
			});
			enqueueSnackbar("Data berhasil dihapus", { variant: "success" });
			router.push("/bridge/perilaku");
		},
	});

	const editHandler = async () =>
		router.push(`/bridge/perilaku/edit/${row.id}`);

	const deleteHandler = async () => {
		const x = confirm("Apakah anda yakin ingin menghapus data ini?");
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

export default BridgePerilakuActionButtons;

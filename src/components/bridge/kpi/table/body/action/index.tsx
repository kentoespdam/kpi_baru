import { BridgeKpiWithAudit } from "@myTypes/entity/bridge.kpi";
import { useBridgeKpiStore } from "@store/filter/bridge/kpi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doDelete } from "@utils/bridge/kpi";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

const BtnActionBuilder = dynamic(
	() => import("@components/commons/table/action/button.builder")
);

type BridgeKpiActionButtonsProps = {
	row: BridgeKpiWithAudit;
};
const BridgeKpiActionButtons = (props: BridgeKpiActionButtonsProps) => {
	const { row } = props;
	const router = useRouter();
	const {
		pageRequest,
		sortRequest,
		nipam,
		name,
		position,
		organization,
		level,
		kpi,
		status,
	} = useBridgeKpiStore();
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
					"bridge.kpi",
					{
						pageRequest,
						sortRequest,
					},
					{
						nipam,
						name,
						position,
						organization,
						level,
						kpi,
						status,
					},
				],
			});
			enqueueSnackbar("Data berhasil dihapus", { variant: "success" });
			router.push("/bridge/kpi");
		},
	});

	const editHandler = async () => router.push(`/bridge/kpi/edit/${row.id}`);

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

export default BridgeKpiActionButtons;

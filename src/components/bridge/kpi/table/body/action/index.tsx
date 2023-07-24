import BtnActionBuilder from "@components/commons/table/action/button.builder";
import { BridgeKpiWithAudit } from "@myTypes/entity/bridge.kpi";
import { useBridgeKpiStore } from "@store/filter/bridge/kpi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doDelete } from "@utils/bridge/kpi";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

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
		positionId,
		organizationId,
		levelId,
		kpiId,
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
						positionId,
						organizationId,
						levelId,
						kpiId,
						status,
					},
				],
			});
			enqueueSnackbar("Data berhasil dihapus", { variant: "success" });
			router.push("/master/grade");
		},
	});

	const editHandler = async () => router.push(`/master/grade/edit/${row.id}`);

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

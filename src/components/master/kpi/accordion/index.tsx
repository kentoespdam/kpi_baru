import { KpiWithPagination } from "@myTypes/entity/kpi";
import { useKpiStore } from "@store/filter/master/kpi";
import { useQueryClient } from "@tanstack/react-query";
import KpiAccordionItem from "./item";

const KpiAccordion = () => {
	const qc = useQueryClient();
	const {
		pageRequest,
		sortRequest,
		organization,
		position,
		profesi,
		name,
		grade,
		setExpanded,
	} = useKpiStore();
	const data = qc.getQueryData([
		"master.kpi",
		{ pageRequest, sortRequest },
		{
			organization,
			position,
			profesi,
			name,
			grade,
		},
	]) satisfies KpiWithPagination | undefined;

	if (!data) return null;
	let urut = data.number * data.size + 1;

	return (
		<>
			{data.content.map((item) => (
				<KpiAccordionItem key={item.id} kpi={item} urut={urut++} />
			))}
		</>
	);
};

export default KpiAccordion;

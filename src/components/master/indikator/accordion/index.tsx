import { IndikatorWithPagination } from "@myTypes/entity/indikator";
import { useIndikatorStore } from "@store/filter/master/indikator";
import { useQueryClient } from "@tanstack/react-query";
import IndikatorAccordionItem from "./item";

const IndikatorAccordion = () => {
	const { pageRequest, sortRequest, kpiId, indikator, status } =
		useIndikatorStore();
	const qc = useQueryClient();

	const data = qc.getQueryData([
		"master.indikator",
		{ pageRequest, sortRequest },
		{ kpiId, indikator, status },
	]) satisfies IndikatorWithPagination | undefined;
	if (!data) return null;

	return (
		<>
			{data.content.map((item) => (
				<IndikatorAccordionItem
					key={item.id}
					indikatorWithAudit={item}
				/>
			))}
		</>
	);
};

export default IndikatorAccordion;

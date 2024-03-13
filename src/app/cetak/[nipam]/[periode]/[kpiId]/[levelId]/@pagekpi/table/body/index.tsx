import { TransIndikator } from "@myTypes/entity/trans.indikator";
import { useCetakStore } from "@store/server/cetak";
import IndikatorPageBuilder from "./indikator";

const PageKpiTableBody = async () => {
	const kpiData = useCetakStore.getState().kpiData;
	let urut = 1;
	return kpiData === null ? null : (
		<tbody>
			{kpiData.indikatorList.map((indikator: TransIndikator) => (
				<IndikatorPageBuilder
					key={indikator.id}
					indikator={indikator}
					urut={urut++}
				/>
			))}
		</tbody>
	);
};

export default PageKpiTableBody;

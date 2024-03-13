import { TransIndikator } from "@myTypes/entity/trans.indikator";
import UraianPageBuilder from "./uraian";

type IndikatorPageBuilderProps = {
	indikator: TransIndikator;
	urut: number;
};

const IndikatorPageBuilder = (props: IndikatorPageBuilderProps) => {
	const { indikator, urut } = props;
	const uraianList = indikator.uraianList;
	const uraianSize = uraianList.length;
	const rowSpan = uraianSize <= 1 ? 1 : uraianSize;

	return (
		<>
			<tr>
				<td rowSpan={rowSpan}>{urut}</td>
				<td rowSpan={rowSpan}>{indikator.indikator}</td>
				{uraianSize > 0 ? (
					<UraianPageBuilder uraianList={uraianList} first />
				) : (
					<>
						<td></td>
						<td></td>
						<td></td>
					</>
				)}
			</tr>
			{rowSpan > 1 ? <UraianPageBuilder uraianList={uraianList} /> : null}
		</>
	);
};

export default IndikatorPageBuilder;

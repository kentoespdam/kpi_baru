import { TransUraian } from "@myTypes/entity/trans.uraian";

type UraianCellBuilderProps = {
	uraian: TransUraian;
};
const UraianCellBuilder = (props: UraianCellBuilderProps) => {
	const { uraian } = props;

	return (
		<>
			<td>{uraian.uraian}</td>
			<td align="right">{uraian.volume}</td>
			<td align="center">{uraian.satuan}</td>
			<td align="center">{uraian.waktu}</td>
			<td align="right">{uraian.bobot}%</td>
			<td align="right">{uraian.capaianVolume}</td>
			<td align="center">{uraian.capaianSatuan}</td>
			<td align="center">{uraian.capaianWaktu}</td>
			<td align="right">{uraian.nilaiProdukKerja}</td>
			<td align="right">{uraian.nilaiWaktu}</td>
			<td align="right">{uraian.nilaiTotalUraian}</td>
		</>
	);
};

type UraianPageBuilderProps = {
	uraianList: TransUraian[];
	first?: boolean;
};
const UraianPageBuilder = (props: UraianPageBuilderProps) => {
	const { uraianList, first } = props;

	return first ? (
		<UraianCellBuilder uraian={uraianList[0]} />
	) : (
		<>
			{uraianList.map((uraian, index) =>
				index === 0 ? null : (
					<tr key={uraian.id}>
						<UraianCellBuilder uraian={uraian} />
					</tr>
				)
			)}
		</>
	);
};

export default UraianPageBuilder;

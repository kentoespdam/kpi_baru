type BioDetailProps = {
	field: string;
	value?: String;
};
const BioDetail = (props: BioDetailProps) => {
	const { field, value } = props;

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				fontWeight: "bold",
			}}
		>
			<span style={{ flex: 4 }}>{field}</span>
			<span style={{ flex: 8 }}>{value ? `: ${value}` : null}</span>
		</div>
	);
};

export default BioDetail;

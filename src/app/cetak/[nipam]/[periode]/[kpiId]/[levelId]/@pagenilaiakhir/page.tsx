import PageNilaiAkhirTableBody from "./table/body";
import PageNilaiAkhirTableFoot from "./table/foot";
import PageNilaiAkhirTableHead from "./table/head";

const PageNilaiAkhir = () => {
	return (
		<div style={{ flex: 1 }} id="perilaku-data">
			<table
				style={{
					borderCollapse: "collapse",
					width: "100%",
				}}
				className="table"
			>
				<PageNilaiAkhirTableHead />
				<PageNilaiAkhirTableBody />
				<PageNilaiAkhirTableFoot />
			</table>
		</div>
	);
};

export default PageNilaiAkhir;

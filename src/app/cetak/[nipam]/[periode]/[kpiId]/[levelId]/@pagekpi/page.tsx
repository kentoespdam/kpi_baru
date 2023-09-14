import PageKpiTableBody from "./table/body";
import PageKpiTableFooter from "./table/footer";
import PageKpiTableHead from "./table/head";

const PageKpi = async () => {
	return (
		<div style={{ flex: 1 }} id="kpi-data">
			<table
				border={1}
				style={{
					border: "solid 1px black",
					borderCollapse: "collapse",
				}}
			>
				<PageKpiTableHead />
				<PageKpiTableBody />
				<PageKpiTableFooter />
			</table>
		</div>
	);
};

export default PageKpi;

import PagePerilakuTableBody from "./table/body";
import PagePerilakuTableFooter from "./table/footer";
import PagePerilakuTableHead from "./table/head";

const PagePerilaku = async () => {
	return (
		<div style={{ flex: 1 }} id="perilaku-data">
			<table
				border={1}
				style={{
					border: "solid 1px black",
					borderCollapse: "collapse",
					width: "100%",
				}}
			>
				<PagePerilakuTableHead />
				<PagePerilakuTableBody />
				<PagePerilakuTableFooter />
			</table>
		</div>
	);
};

export default PagePerilaku;

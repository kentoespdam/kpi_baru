import { getBiodata } from "@utils/eo/server/biodata";
import "./style.css";
import { getKpiData } from "@utils/eo/server/transKpi";
import { useCetakStore } from "@store/server/cetak";
import { getPerilakuData } from "@utils/eo/server/transPerilaku";

const Layout = async (props: {
	children: React.ReactNode;
	pageKop: React.ReactNode;
	pagekpi: React.ReactNode;
	pageperilaku: React.ReactNode;
	pagenilaiakhir: React.ReactNode;
	ttdkpi: React.ReactNode;
	ttdperilaku: React.ReactNode;
	params: { nipam: string; periode: number; kpiId: number; levelId: number };
}) => {
	const { nipam, periode, kpiId, levelId } = props.params;
	useCetakStore.setState({ nipam, periode, kpiId, levelId });
	Promise.all([
		await getBiodata(nipam),
		await getKpiData(nipam, periode, kpiId),
		await getPerilakuData(nipam, periode, levelId),
	]);

	return (
		<>
			{props.children}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				{props.pageKop}
				{props.pagekpi}
				{props.ttdkpi}
			</div>
			<footer style={{ marginTop: 10, textAlign: "center" }}>
				<small>Copyright &copy; Perumdam Tirta Satria</small>
			</footer>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				{props.pageKop}
				{props.pageperilaku}
				{props.ttdperilaku}
			</div>
			<footer style={{ marginTop: 10, textAlign: "center" }}>
				<small>Copyright &copy; Perumdam Tirta Satria</small>
			</footer>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				{props.pageKop}
				{props.pagenilaiakhir}
				{props.ttdperilaku}
			</div>
			<footer style={{ marginTop: 10, textAlign: "center" }}>
				<small>Copyright &copy; Perumdam Tirta Satria</small>
			</footer>
		</>
	);
};

export default Layout;

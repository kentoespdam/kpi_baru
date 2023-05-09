import Dashboard from "@mui/icons-material/Dashboard";

interface ISubMenu {
	path: string;
	name: string;
	icon: React.ReactElement;
}

export interface IMenu {
	path: string;
	name: string;
	icon: React.ReactElement;
	subMenu?: ISubMenu[];
}

type IMenuList = IMenu[];

export const menuList: IMenuList = [
	{ path: "/", name: "Dashboard", icon: <Dashboard /> },
	{
		path: "#",
		name: "Master",
		icon: <Dashboard />,
		subMenu: [
			{ path: "master/level", name: "Level", icon: <Dashboard /> },
			{ path: "master/grade", name: "Grade", icon: <Dashboard /> },
			{ path: "master/profesi", name: "Profesi", icon: <Dashboard /> },
			{ path: "master/kpi", name: "KPI", icon: <Dashboard /> },
			{ path: "master/indikator", name: "Indikator", icon: <Dashboard /> },
			{ path: "master/uraian-indikator", name: "Uraian Indikator", icon: <Dashboard /> },
			{ path: "master/perilaku", name: "Perilaku", icon: <Dashboard /> },
			// { path: "master/pegawai", name: "Pegawai", icon: <Dashboard /> },
		],
	},
	{
		path: "#",
		name: "Bridge",
		icon: <Dashboard />,
		subMenu: [
			{ path: "bridge/kpi-pegawai", name: "KPI Pegawai", icon: <Dashboard /> },
			{ path: "bridge/level-perilaku", name: "Level Perilaku", icon: <Dashboard /> },
		],
	},
	{ path: "/penilaian-kpi", name: "Penilaian KPI", icon: <Dashboard /> },
];

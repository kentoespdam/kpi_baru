import HomeOutlinedIcon from "@ant-design/icons/HomeOutlined";
import OrderedListOutlinedIcon from "@ant-design/icons/OrderedListOutlined";
import RiseOutlinedIcon from "@ant-design/icons/RiseOutlined";
import CarryOutOutlinedIcon from "@ant-design/icons/lib/icons/CarryOutOutlined";
import CheckCircleOutlinedIcon from "@ant-design/icons/lib/icons/CheckCircleOutlined";
import ControlOutlinedIcon from "@ant-design/icons/lib/icons/ControlOutlined";
import IdcardOutlinedIcon from "@ant-design/icons/lib/icons/IdcardOutlined";
import PartitionOutlinedIcon from "@ant-design/icons/lib/icons/PartitionOutlined";
import PullRequestOutlinedIcon from "@ant-design/icons/lib/icons/PullRequestOutlined";
import TeamOutlinedIcon from "@ant-design/icons/lib/icons/TeamOutlined";
import UserSwitchOutlinedIcon from "@ant-design/icons/lib/icons/UserSwitchOutlined";
import { ObjectValues, UserRole } from "@myTypes/index";

const MENU_TYPE = {
	GROUP: "group",
	ITEM: "item",
} as const;

type MenuType = ObjectValues<typeof MENU_TYPE>;

export interface ISubMenu {
	path: string;
	name: string;
	icon?: React.ReactElement;
	role: UserRole;
}

export interface IMenu extends ISubMenu {
	type: MenuType;
	subMenu?: ISubMenu[];
}

type IMenuList = IMenu[];

export const menuList: IMenuList = [
	{
		path: "#",
		name: "Navigation",
		type: "group",
		role: "staff",
		subMenu: [
			{
				path: "/",
				name: "Dashboard",
				icon: <HomeOutlinedIcon />,
				role: "staff",
			},
		],
	},

	{
		path: "#",
		name: "Master",
		type: "group",
		role: "staff",
		subMenu: [
			{
				path: "/master/level",
				name: "Level",
				icon: <RiseOutlinedIcon />,
				role: "staff",
			},
			{
				path: "/master/grade",
				name: "Grade",
				icon: <OrderedListOutlinedIcon />,
				role: "staff",
			},
			{
				path: "/master/profesi",
				name: "Profesi",
				icon: <IdcardOutlinedIcon />,
				role: "staff",
			},
			{
				path: "/master/kpi",
				name: "KPI",
				icon: <CarryOutOutlinedIcon />,
				role: "staff",
			},
			{
				path: "/master/indikator",
				name: "Indikator",
				icon: <ControlOutlinedIcon />,
				role: "staff",
			},
			{
				path: "/master/uraian-indikator",
				name: "Uraian Indikator",
				icon: <PartitionOutlinedIcon />,
				role: "staff",
			},
			{
				path: "/master/perilaku",
				name: "Perilaku",
				icon: <PullRequestOutlinedIcon />,
				role: "staff",
			},
		],
	},
	{
		path: "#",
		name: "Bridge",
		type: "group",
		role: "staff",
		subMenu: [
			{
				path: "bridge/kpi-pegawai",
				name: "KPI Pegawai",
				icon: <TeamOutlinedIcon />,
				role: "staff",
			},
			{
				path: "bridge/level-perilaku",
				name: "Level Perilaku",
				icon: <UserSwitchOutlinedIcon />,
				role: "staff",
			},
		],
	},
	{
		path: "#",
		name: "Penilaian KPI",
		type: "group",
		role: "staff",
		subMenu: [
			{
				path: "/penilaian-kpi",
				name: "Penilaian KPI",
				icon: <CheckCircleOutlinedIcon />,
				role: "staff",
			},
		],
	},
];

export const hashPath = () => {
	return menuList.map((menu) =>
		menu.path === "#" ? menu.name.toLowerCase() : null
	);
};

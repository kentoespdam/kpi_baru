import DeploymentUnitOutlined from "@ant-design/icons/DeploymentUnitOutlined";
import HomeOutlinedIcon from "@ant-design/icons/HomeOutlined";
import OrderedListOutlinedIcon from "@ant-design/icons/OrderedListOutlined";
import RiseOutlinedIcon from "@ant-design/icons/RiseOutlined";
import CarryOutOutlinedIcon from "@ant-design/icons/lib/icons/CarryOutOutlined";
import CheckCircleOutlinedIcon from "@ant-design/icons/lib/icons/CheckCircleOutlined";
import IdcardOutlinedIcon from "@ant-design/icons/lib/icons/IdcardOutlined";
import PullRequestOutlinedIcon from "@ant-design/icons/lib/icons/PullRequestOutlined";
import TeamOutlinedIcon from "@ant-design/icons/lib/icons/TeamOutlined";
import UserSwitchOutlinedIcon from "@ant-design/icons/lib/icons/UserSwitchOutlined";
import { ObjectValues, USER_ROLE, UserRole } from "@myTypes/index";

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
		role: USER_ROLE.USER,
		subMenu: [
			{
				path: "/",
				name: "Dashboard",
				icon: <HomeOutlinedIcon />,
				role: USER_ROLE.USER,
			},
		],
	},

	{
		path: "#",
		name: "Master",
		type: "group",
		role: USER_ROLE.ADMIN,
		subMenu: [
			{
				path: "/master/level",
				name: "Level",
				icon: <RiseOutlinedIcon />,
				role: USER_ROLE.ADMIN,
			},
			{
				path: "/master/grade",
				name: "Grade",
				icon: <OrderedListOutlinedIcon />,
				role: USER_ROLE.ADMIN,
			},
			{
				path: "/master/profesi",
				name: "Profesi",
				icon: <IdcardOutlinedIcon />,
				role: USER_ROLE.ADMIN,
			},
			{
				path: "/master/satuan",
				name: "Satuan",
				icon: <DeploymentUnitOutlined />,
				role: USER_ROLE.ADMIN,
			},
			{
				path: "/master/kpi",
				name: "KPI",
				icon: <CarryOutOutlinedIcon />,
				role: USER_ROLE.ADMIN,
			},
			// {
			// 	path: "/master/indikator",
			// 	name: "Indikator",
			// 	icon: <ControlOutlinedIcon />,
			// 	role: USER_ROLE.USER,
			// },
			// {
			// 	path: "/master/uraian-indikator",
			// 	name: "Uraian Indikator",
			// 	icon: <PartitionOutlinedIcon />,
			// 	role: USER_ROLE.USER,
			// },
			{
				path: "/master/perilaku",
				name: "Perilaku",
				icon: <PullRequestOutlinedIcon />,
				role: USER_ROLE.ADMIN,
			},
		],
	},
	{
		path: "#",
		name: "Bridge",
		type: "group",
		role: USER_ROLE.ADMIN,
		subMenu: [
			{
				path: "/bridge/kpi",
				name: "KPI Pegawai",
				icon: <TeamOutlinedIcon />,
				role: USER_ROLE.ADMIN,
			},
			{
				path: "/bridge/perilaku",
				name: "Level Perilaku",
				icon: <UserSwitchOutlinedIcon />,
				role: USER_ROLE.ADMIN,
			},
		],
	},
	{
		path: "#",
		name: "Penilaian KPI",
		type: "group",
		role: USER_ROLE.USER,
		subMenu: [
			{
				path: "/trans/kpi",
				name: "Penilaian KPI",
				icon: <CheckCircleOutlinedIcon />,
				role: USER_ROLE.USER,
			},
		],
	},
];

export const hashPath = () => {
	return menuList.map((menu) =>
		menu.path === "#" ? menu.name.toLowerCase() : null
	);
};

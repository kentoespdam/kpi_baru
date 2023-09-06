import { ObjectValues, USER_ROLE, UserRole } from "@myTypes/index";
import dynamic from "next/dynamic";

const DeploymentUnitOutlined = dynamic(
	() => import("@ant-design/icons/DeploymentUnitOutlined")
);
const HomeOutlinedIcon = dynamic(
	() => import("@ant-design/icons/HomeOutlined")
);
const OrderedListOutlinedIcon = dynamic(
	() => import("@ant-design/icons/OrderedListOutlined")
);
const RiseOutlinedIcon = dynamic(
	() => import("@ant-design/icons/RiseOutlined")
);
const CarryOutOutlinedIcon = dynamic(
	() => import("@ant-design/icons/lib/icons/CarryOutOutlined")
);
const CheckCircleOutlinedIcon = dynamic(
	() => import("@ant-design/icons/lib/icons/CheckCircleOutlined")
);
const IdcardOutlinedIcon = dynamic(
	() => import("@ant-design/icons/lib/icons/IdcardOutlined")
);
const PullRequestOutlinedIcon = dynamic(
	() => import("@ant-design/icons/lib/icons/PullRequestOutlined")
);
const TeamOutlinedIcon = dynamic(
	() => import("@ant-design/icons/lib/icons/TeamOutlined")
);
const UserSwitchOutlinedIcon = dynamic(
	() => import("@ant-design/icons/lib/icons/UserSwitchOutlined")
);

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

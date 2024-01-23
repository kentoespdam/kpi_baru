import { USER_ROLE, UserRole } from "@utils/index";
import {
    AudioLinesIcon, CandlestickChartIcon, ComponentIcon,
    HomeIcon, PencilLineIcon, Rotate3DIcon, ShieldCheckIcon,
    SignalHighIcon, SplineIcon, TangentIcon
} from "lucide-react";

export type ChildrenNode = {
    children: React.ReactNode;
}

const defaultIconClassName = "w-3 h-3"

export interface IMenu {
    path: string;
    name: string;
    role: UserRole;
    type?: "group" | "item";
    icon?: React.ReactElement;
    subMenu?: IMenu[]
}

export const menus: IMenu[] = [
    {
        path: "#",
        name: "Navigation",
        type: "group",
        role: USER_ROLE.USER,
        subMenu: [
            {
                path: "/",
                name: "Dashboard",
                icon: <HomeIcon className={defaultIconClassName} />,
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
                icon: <AudioLinesIcon className={defaultIconClassName} />,
                role: USER_ROLE.ADMIN,
            },
            {
                path: "/master/grade",
                name: "Grade",
                icon: <CandlestickChartIcon className={defaultIconClassName} />,
                role: USER_ROLE.ADMIN,
            },
            {
                path: "/master/profesi",
                name: "Profesi",
                icon: <ShieldCheckIcon className={defaultIconClassName} />,
                role: USER_ROLE.ADMIN,
            },
            {
                path: "/master/satuan",
                name: "Satuan",
                icon: <SignalHighIcon className={defaultIconClassName} />,
                role: USER_ROLE.ADMIN,
            },
            {
                path: "/master/kpi",
                name: "KPI",
                icon: <ComponentIcon className={defaultIconClassName} />,
                role: USER_ROLE.ADMIN,
            },
            {
                path: "/master/perilaku",
                name: "Perilaku",
                icon: <Rotate3DIcon className={defaultIconClassName} />,
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
                icon: <TangentIcon className={defaultIconClassName} />,
                role: USER_ROLE.ADMIN,
            },
            {
                path: "/bridge/perilaku",
                name: "Level Perilaku",
                icon: <SplineIcon className={defaultIconClassName} />,
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
                icon: <PencilLineIcon className={defaultIconClassName} />,
                role: USER_ROLE.USER,
            },
        ],
    },
]
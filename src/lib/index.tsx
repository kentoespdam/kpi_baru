import { USER_ROLE, UserRole } from "@tipes/index";
import {
    AudioLinesIcon, CandlestickChartIcon, ComponentIcon,
    HomeIcon, PencilLineIcon, Rotate3DIcon, ShieldCheckIcon,
    SignalHighIcon, SplineIcon, TangentIcon
} from "lucide-react";
import React from "react";
import { z } from "zod";

export type ChildrenNode = {
    children: React.ReactNode;
}

const defaultIconClassName = "w-3 h-3"

const MenuType = z.enum(["group", "item"])
type MenuType = z.infer<typeof MenuType>

export const IMenu = z.object({
    path: z.string(),
    name: z.string(),
    role: UserRole,
    type: MenuType.optional(),
})

export type IMenu = z.infer<typeof IMenu> & {
    icon?: React.ReactElement
    subMenu?: IMenu[]
}

export const menus: IMenu[] = [
    {
        path: "#",
        name: "Navigation",
        type: "group",
        role: "USER",
        subMenu: [
            {
                path: "/",
                name: "Dashboard",
                icon: <HomeIcon className={defaultIconClassName} />,
                role: "USER",
            },
        ],
    },
    {
        path: "#",
        name: "Master",
        type: "group",
        role: "ADMIN",
        subMenu: [
            {
                path: "/master/level",
                name: "Level",
                icon: <AudioLinesIcon className={defaultIconClassName} />,
                role: "ADMIN",
            },
            {
                path: "/master/grade",
                name: "Grade",
                icon: <CandlestickChartIcon className={defaultIconClassName} />,
                role: "ADMIN",
            },
            {
                path: "/master/profesi",
                name: "Profesi",
                icon: <ShieldCheckIcon className={defaultIconClassName} />,
                role: "ADMIN",
            },
            {
                path: "/master/satuan",
                name: "Satuan",
                icon: <SignalHighIcon className={defaultIconClassName} />,
                role: "ADMIN",
            },
            {
                path: "/master/kpi",
                name: "KPI",
                icon: <ComponentIcon className={defaultIconClassName} />,
                role: "ADMIN",
            },
            {
                path: "/master/perilaku",
                name: "Perilaku",
                icon: <Rotate3DIcon className={defaultIconClassName} />,
                role: "ADMIN",
            },
        ],
    },
    {
        path: "#",
        name: "Bridge",
        type: "group",
        role: "ADMIN",
        subMenu: [
            {
                path: "/bridge/kpi",
                name: "KPI Pegawai",
                icon: <TangentIcon className={defaultIconClassName} />,
                role: "ADMIN",
            },
            {
                path: "/bridge/perilaku",
                name: "Level Perilaku",
                icon: <SplineIcon className={defaultIconClassName} />,
                role: "ADMIN",
            },
        ],
    },
    {
        path: "#",
        name: "Penilaian KPI",
        type: "group",
        role: "USER",
        subMenu: [
            {
                path: "/trans/kpi",
                name: "Penilaian KPI",
                icon: <PencilLineIcon className={defaultIconClassName} />,
                role: "USER",
            },
        ],
    },
]
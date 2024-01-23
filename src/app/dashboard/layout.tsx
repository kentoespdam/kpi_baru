import TopBarComponent from "@components/template/topbar";
import MenuCommand from "@components/template/topbar/menuCommand";
import { getCurrentAccount } from "@lib/appwrite/user";
import { ChildrenNode } from "@lib/index";
import { useSessionStore } from "@store/main/session";
import { cookies } from "next/headers";
import { Suspense } from "react";

const DashboardLayout = async ({ children }: ChildrenNode) => {
    const cookieList = cookies()
    const account = await getCurrentAccount(cookieList)

    return (
        <Suspense >
            <div className="min-h-screen min-w-screen">
                <div className="border-red-600 pb-10">
                    <TopBarComponent account={account} />
                    <div className="h-full flex items justify-between">
                        <div className="min-h-full">
                            <MenuCommand />
                        </div>
                        <div className="w-full p-4">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    );
}

export default DashboardLayout;
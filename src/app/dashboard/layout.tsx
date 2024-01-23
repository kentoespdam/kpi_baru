import ThemeProvider from "@components/providers/theme";
import TopBarComponent from "@components/template/topbar";
import MenuCommand from "@components/template/topbar/menuCommand";
import { Separator } from "@components/ui/separator";
import { ChildrenNode } from "@lib/index";
import { cookies } from "next/headers";

const DashboardLayout = async ({ children }: ChildrenNode) => {
    const cookieList = cookies()
    // const account = await getCurrentAccount(cookieList)
    return (
        <div className="min-h-screen min-w-screen">
            <div className="border-red-600 flex flex-col pb-10">
                <TopBarComponent />
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
    );
}

export default DashboardLayout;
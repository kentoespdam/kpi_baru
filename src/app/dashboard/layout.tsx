import MenuCommand from "@components/template/topbar/menuCommand";
import { ChildrenNode } from "@lib/index";
import { cookies } from "next/headers";
import { ReactNode, Suspense } from "react";

const DashboardLayout = async ({ children }: ChildrenNode) => {
    const cookieList = cookies()
    // const account = await getCurrentAccount(cookieList)

    return (
        <Suspense >
            <div className="min-h-screen min-w-screen">
                <div className="border-red-600 pb-10">
                    <div className="border">
                        <div className="mx-auto max-w-7x1 px-2 sm:px-4 lg:px-4 mr-2">
                            <div className="flex h-12 items-center justify-between">
                                <div className="flex item-center md:ml-6 justify-around">

                                </div>
                                <div className="flex items-center md:ml-6 justify-around">
                                    {/* <ProfilComponent /> */}
                                </div>
                            </div>
                            {/* <div className="flex h-6 justify-end">
                                <small className="text-small">
                                    <span className="font-bold">BAGUS SUDRAJAT, S.Kom.</span>
                                </small>
                            </div> */}
                        </div>
                    </div>
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
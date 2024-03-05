import ManuSheet from "@components/template/menusheet"
import ProfileComponent from "@components/template/profile"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"

const MasterLayout = async ({ children }: {
    children: React.ReactNode
}) => {
    return (<div className="min-h-screen min-w-screen">
        <div className="border-red-600 pb-10">
            <div className="border">
                <div className="mx-auto max-w-7x1 px-2 sm:px-4 lg:px-4 mr-2">
                    <div className="flex h-12 items-center justify-between">
                        <div className="flex items-center justify-between gap-4">
                            <Avatar className="w-12 h-10">
                                <AvatarImage
                                    className="dark:bg-white"
                                    src="/logo_pdam_40x40.png"
                                    alt="Perumdam Tirta Satria"
                                    width={60}
                                    height={50} />
                                <AvatarFallback>Logo PDAM</AvatarFallback>
                            </Avatar>
                            <ManuSheet />
                            <h2 className="scroll-m-20 text-2xl font-bold tracking-tight">
                                Key Performance Indicator</h2>
                        </div>
                        <div className="md:ml-6">
                            <ProfileComponent />
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full flex items justify-between">
                <div className="w-full p-4">
                    {children}
                </div>
            </div>
        </div>
    </div>)
}

export default MasterLayout
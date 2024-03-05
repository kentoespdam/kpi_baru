import ToggleThemeButton from "@components/template/theme";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { extracNipamFromToken } from "@helpers/index";
import { getEmployeeByNipam } from "@utils/eo/employee";
import { KeyRound, LogOut } from "lucide-react";

const ProfilePage = async () => {
    const nipam = extracNipamFromToken()
    if (!nipam) return null
    const employee = await getEmployeeByNipam(nipam)

    return (
        <div className="py-2 flex items-center gap-3">
            <div className="flex flex-col">
                <h3 className="font-medium text-foreground">{employee?.nama}</h3>
                <span>{employee?.position.name}</span>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer w-8 h-8">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" width={32} height={32} />
                        <AvatarFallback>ID</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer hover:bg-accent">
                        <KeyRound className="h-[1.2rem] w-[1.2rem] scale-100 transition-all mr-2" />
                        <span>Change Password</span>
                    </DropdownMenuItem>
                    <ToggleThemeButton />
                    <DropdownMenuItem className="cursor-pointer">
                        <LogOut className="h-[1.2rem] w-[1.2rem] scale-100 transition-all mr-2" />
                        <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default ProfilePage;
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { KeyRound, LogOut } from "lucide-react";
import ToggleThemeButton from "../theme";

const ProfilComponent = () => {
    return (
        <div className="py-2">
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

export default ProfilComponent;
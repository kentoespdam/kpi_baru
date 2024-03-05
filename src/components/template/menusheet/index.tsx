import { Button } from "@components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { LayoutDashboardIcon } from "lucide-react";
import SheetMenuCommand from "./menucommand";

const ManuSheet = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <LayoutDashboardIcon />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-fit">
                <SheetMenuCommand />
            </SheetContent>
        </Sheet>
    );
}

export default ManuSheet;
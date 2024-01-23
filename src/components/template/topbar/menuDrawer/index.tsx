import { Button } from "@components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@components/ui/drawer";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip";
import { ListIcon } from "lucide-react";

const MenuContent = () => {
    return (
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    )
}

const MenuDrawer = () => {
    return (
        <Drawer>
            <DrawerTrigger>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button variant="outline" size="icon">
                                <ListIcon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Show Menu
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DrawerTrigger>
            <MenuContent />
        </Drawer>
    );
}

export default MenuDrawer;
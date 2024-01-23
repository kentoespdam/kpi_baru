"use client"
import { Button } from "@components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@components/ui/command";
import { IMenu, menus } from "@lib/index";
import { useMenuStore } from "@store/main/leftMenu";
import { cn } from "@utils/index";
import { ArrowBigLeftDashIcon } from "lucide-react";
import Link from "next/link";

type MenuListBuilderProps = {
    menu: IMenu
}
const MenuListBuilder = (props: MenuListBuilderProps) => {
    return props.menu.type === "group" ?
        <CommandGroup heading={props.menu.name}>
            {props.menu.subMenu?.length === 0 ? null :
                props.menu.subMenu?.map((menu, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <MenuListBuilder menu={menu} key={index} />
                ))}
        </CommandGroup> :
        <Link href={props.menu.path}>
            <CommandItem className="gap-2">
                {props.menu.icon}
                {props.menu.name}
            </CommandItem>
        </Link>
}

const MenuCommand = () => {
    const { isMenuOpen, setMenuOpen } = useMenuStore()

    return (
        <div className={cn("h-full flex", isMenuOpen ? "w-42" : "w-0")}>
            <Command>
                <CommandInput placeholder={`${isMenuOpen} Type to search...`} />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {menus.map((menu, index) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        <MenuListBuilder menu={menu} key={index} />
                    ))}
                </CommandList>
            </Command>
            <div className="flex h-full border item-center justify-center">
                <Button onClick={setMenuOpen} className={"absolute m-[35vh] transition opacity-10 hover:opacity-100 duration-1000 "} size="icon">
                    <ArrowBigLeftDashIcon width={20} height={20} className={cn("transform duration-200", isMenuOpen ? "rotate-0" : "rotate-180")} />
                </Button>
            </div>
        </div>
    );
}

export default MenuCommand;
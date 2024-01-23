"use client"
import { Button } from "@components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@components/ui/command";
import { IMenu, menus } from "@lib/index";
import { useMenuStore } from "@store/main/leftMenu";
import { ArrowBigLeftDashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type MenuListBuilderProps = {
    menu: IMenu
}
const MenuListBuilder = (props: MenuListBuilderProps) => {
    const router = useRouter()
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
        <div className={`h-full flex transform duration-1000 w-${isMenuOpen ? "42" : "0"}`}>
            <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList className="min-h-full scroll-smooth pb-16">
                    <CommandEmpty>No results found.</CommandEmpty>
                    {menus.map((menu, index) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        <MenuListBuilder menu={menu} key={index} />
                    ))}
                </CommandList>
            </Command>
            <div className="flex h-full border item-center justify-center">
                <Button onClick={setMenuOpen} className={"absolute m-[35vh] transition opacity-10 hover:opacity-100 duration-1000 "} size="icon">
                    <ArrowBigLeftDashIcon width={20} height={20} className={`transform duration-200 rotate-${isMenuOpen ? "0" : "180"}`} />
                </Button>
            </div>
        </div>
    );
}

export default MenuCommand;
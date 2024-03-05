"use client"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@components/ui/command";
import { IMenu, menus } from "@lib/index";
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
        <Link href={props.menu.path} className="cursor-pointer">
            <CommandItem className="gap-2 cursor-pointer">
                {props.menu.icon}
                {props.menu.name}
            </CommandItem>
        </Link>
}

const SheetMenuCommand = () => {
    return (
        <Command className="">
            <CommandInput placeholder={"Type to search..."} />
            <CommandList className="min-h-full">
                <CommandEmpty>No results found.</CommandEmpty>
                {menus.map((menu, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <MenuListBuilder menu={menu} key={index} />
                ))}
            </CommandList>
        </Command>
    );
}

export default SheetMenuCommand;
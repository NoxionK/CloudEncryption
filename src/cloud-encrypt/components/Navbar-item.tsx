'use client';

import { Button } from "@nextui-org/react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface NavbarItemProps {
    icon?: string;
    children: React.ReactNode;
    currentPath: string;
    rootPath: string;
}

const NavbarItem = (
    {children, icon, currentPath, rootPath}: NavbarItemProps
) => {
    const isActive = rootPath === "/" ? rootPath === currentPath : currentPath.startsWith(rootPath);
    const router = useRouter();

    return ( 
        <Button className={clsx(
            'flex flex-col h-20 w-full border-white border-2 rounded-2xl font-bold justify-center items-center bg-transparent hover:bg-sky-300 hover:text-blue-950 hover:cursor-pointer', 
            isActive ? 'bg-blue-300 text-blue-950' : 'text-white')} 
            onClick={() => router.push(rootPath)}
        >
            {children}
        </Button>
     );
}
 
export default NavbarItem;
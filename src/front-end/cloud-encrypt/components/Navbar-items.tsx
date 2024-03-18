'use client';

import NavbarItem from "@/components/Navbar-item";


interface NavbarItemsProps {
    pathName: string;
}

const NavbarItems = ({ 
    pathName
}: NavbarItemsProps) => {
    return (
        <div className="mt-20 space-y-3 mx-3">
            <NavbarItem currentPath={pathName} rootPath="/" >HOME</NavbarItem>
            <NavbarItem currentPath={pathName} rootPath="/upload" >DATA UPLOAD</NavbarItem>
            <NavbarItem currentPath={pathName} rootPath="/cloud">CLOUD STORAGE</NavbarItem>
            <NavbarItem currentPath={pathName} rootPath="/local">LOCAL STORAGE</NavbarItem>
        </div>
    );
}

export default NavbarItems;
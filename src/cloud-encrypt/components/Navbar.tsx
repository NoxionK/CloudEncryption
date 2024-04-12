'use client';

import Image from "next/image";
import NavbarItems from "@/components/Navbar-items";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();

    return ( 
        <div className="flex flex-col h-full w-64 bg-blue-950 py-2">
            <div 
                className="m-3 px-3 py-7 border-white border-2 rounded-2xl hover:cursor-pointer"
                onClick={() => router.push('/')}
            >
                <Image src={"/logo.svg"} alt="Logo Image" width={256} height={256}></Image>
            </div>
            <NavbarItems pathName={pathname}></NavbarItems>
        </div>
     );
}
 
export default Navbar;
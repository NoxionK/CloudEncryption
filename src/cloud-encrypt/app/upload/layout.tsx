'use client';
import Navbar from "@/components/Navbar";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-sky-100 flex flex-row w-full">
            {children}
        </div>
    );
}

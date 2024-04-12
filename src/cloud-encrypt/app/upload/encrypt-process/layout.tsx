'use client';

const EncryptProcessPageLayout = ({
    children
}: Readonly<{children: React.ReactNode;}>) => {
    return (
        <div className="h-screen w-full flex flex-row justify-center items-center">
            {children}
        </div>
     );
}
 
export default EncryptProcessPageLayout;
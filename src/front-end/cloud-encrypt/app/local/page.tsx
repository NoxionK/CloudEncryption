'use client';

import LocalFilesList from "@/components/LocalFilesList";


const CloudStorage = () => {

    return (
        <div className="flex flex-col w-full h-screen px-20 py-10 justify-start space-y-10">
            <div className="flex flex-col justify-center items-center w-full h-full border-2 border-black rounded-3xl px-10 py-10">
                <div className="font-bold text-xl mb-4">LOCAL STORAGE</div>
                <div className="flex flex-col space-y-2 rounded-xl h-full w-full">
                    <LocalFilesList></LocalFilesList>
                </div>
            </div>
        </div>
    );
}

export default CloudStorage;
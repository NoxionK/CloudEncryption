'use client';
import UploadForm from "@/components/UploadForm";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center w-5/6 h-5/6 border-2 border-black rounded-3xl px-10 py-6 space-y-4">
        <div className="text-xl font-bold	">DATA UPLOAD</div>
        <UploadForm></UploadForm>
      </div>
    </div>
  );
}

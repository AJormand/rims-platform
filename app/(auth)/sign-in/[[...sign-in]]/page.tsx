import { SignIn } from "@clerk/nextjs";
import { Pill, Tablets, FolderHeart, Syringe, ShieldPlus } from "lucide-react";


export default function Page() {
  return (
    <div className="flex w-full h-screen">
      <div className="flex-1 bg-sky-700 flex flex-col items-center justify-center relative">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2 text-white">
            <h1 className="text-4xl font-bold">RIMS PLATFORM</h1>
            <FolderHeart />
          </div>
          <p className="text-sm text-gray-800 font-bold mt-4">
            Ensures your Pharmaceutical Information is managed
          </p>
          <p className="text-sm text-gray-800 font-bold">in line with Regulatory Guidelines</p>
        </div>
        <div className="flex items-center justify-center gap-5 mt-5">
          <div className="p-5 rounded-full border-2 border-white text-white shadow-md shadow-white">
            <Pill/>
          </div>
          <div className="p-5 rounded-full border-2 border-white text-white shadow-md shadow-white">
            <Tablets />
          </div>
          <div className="p-5 rounded-full border-2 border-white text-white shadow-md shadow-white">
            <Syringe /> 
          </div>
        </div>
        <div className="flex items-center w-full absolute bottom-5 left-5">
          <ShieldPlus />
          <p className="text-xs font-bold">Security ensured!</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <SignIn />
      </div>
    </div>
  );
}

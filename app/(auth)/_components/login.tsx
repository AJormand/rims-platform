import {
  Pill,
  Tablets,
  FolderHeart,
  Syringe,
  ShieldPlus,
  Info,
} from "lucide-react";

export const Login = () => {
  return (
    <div className="flex-1 bg-sky-700 flex flex-col items-center justify-center relative">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2 text-white">
          <h1 className="text-4xl font-bold">RIMS PLATFORM</h1>
          <FolderHeart size={60} />
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 mt-5">
        <div className="p-2 rounded-full border-2 border-white text-white shadow-md shadow-white">
          <Pill />
        </div>
        <div className="p-2 rounded-full border-2 border-white text-white shadow-md shadow-white">
          <Tablets />
        </div>
        <div className="p-2 rounded-full border-2 border-white text-white shadow-md shadow-white">
          <Syringe />
        </div>
      </div>
      <div className="flex-col  mt-10 text-xs text-white animate-pulse">
        <div>Ensures your Pharmaceutical Information is managed</div>
        <div className="flex">
          in line with Regulatory Guidelines <Info size={10} />
        </div>
      </div>
      <div className="flex items-center w-full absolute bottom-5 left-5">
        <ShieldPlus />
        <p className="text-xs font-bold">Security ensured!</p>
      </div>
    </div>
  );
};

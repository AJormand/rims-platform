import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex w-full h-screen">
      <div className="flex-1 bg-sky-700 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-white text-4xl">RIMS PLATFORM</h1>
          <p className="text-white">
            Ensures your Pharmaceutical Information is Managed
          </p>
          <p className="text-white">in line with Regulatory Guidelines</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <SignIn />
      </div>
    </div>
  );
}

import { SignUp } from "@clerk/nextjs";
import { Login } from "../../_components/login";

export default function Page() {
  return (
    <div className="flex w-full h-screen">
      <Login />
      <div className="flex-1 flex items-center justify-center">
        <SignUp />
      </div>
    </div>
  );
}

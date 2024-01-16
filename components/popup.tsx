import { Button } from "./ui/button";

interface PopupProps {
  children: React.ReactNode;
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Popup: React.FC<PopupProps> = ({ children, setPopupVisible }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50">
      <div className="absolute w-full h-full bg-slate-300 opacity-60 " />
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="border rounded-lg bg-white p-10">
          <div className="flex justify-between">
            <h1>{`Edit record`}</h1>
            <Button
              onClick={() => {
                setPopupVisible(false);
              }}
              variant={"ghost"}
              className="bold"
            >
              X
            </Button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

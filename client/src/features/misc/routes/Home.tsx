import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="h-screen w-full bg-gray-100">
      <div className="flex min-h-[75px] w-full items-center justify-between bg-gray-400 p-4">
        <span className="font-md text-2xl font-bold">Contacts Management</span>
        <div className="">
          <Button size="lg">
            <Link to="/contacts">Go to Contacts</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

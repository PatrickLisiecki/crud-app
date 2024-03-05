import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Home = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-y-6">
        <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
          Manage your contacts.
        </h1>
        <Link to="/contacts">
          <Button size="lg">
            Go to Contacts <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

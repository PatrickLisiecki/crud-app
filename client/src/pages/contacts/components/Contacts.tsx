import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { CreateContact } from "./CreateContact";
import { ContactList } from "./ContactList";

export const Contacts = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const toggleIsCreating = () => {
    setIsCreating(!isCreating);
  };

  return (
    <div className="md:py-18 flex min-h-screen w-full flex-col bg-gray-100 p-12 md:px-24">
      <div className="flex flex-col items-center gap-x-4 gap-y-2 sm:flex-row sm:gap-y-0">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">Contacts</h1>
        <div className="flex flex-row gap-x-2">
          <Button onClick={() => toggleIsCreating()} variant="default">
            Create <Plus className="ml-2 h-4 w-4" />
          </Button>
          <Link to="/">
            <Button variant="default">Home</Button>
          </Link>
        </div>
      </div>
      <CreateContact isOpen={isCreating} toggleIsOpen={toggleIsCreating} />
      <ContactList />
    </div>
  );
};

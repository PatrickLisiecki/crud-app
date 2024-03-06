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
    <div className="flex h-screen w-full flex-col bg-gray-100 px-24 py-12">
      <div className="flex flex-row items-center gap-x-4">
        <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">Contacts</h1>
        <Button onClick={() => toggleIsCreating()} variant="default">
          Create <Plus className="ml-2 h-4 w-4" />
        </Button>
        <Link to="/">
          <Button variant="default">Home</Button>
        </Link>
      </div>
      <CreateContact isOpen={isCreating} toggleIsOpen={toggleIsCreating} />
      <ContactList />
    </div>
  );
};

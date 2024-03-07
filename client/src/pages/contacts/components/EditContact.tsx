import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Contact } from "../types";

// RTK Query
import { useUpdateContactMutation } from "@/redux/services/contacts";

interface EditContactProps {
  isEditing: boolean;
  toggleIsEditing: () => void;
  currentContact: Contact | undefined;
}

export const EditContact = ({
  isEditing,
  toggleIsEditing,
  currentContact,
}: EditContactProps) => {
  const [updateContact] = useUpdateContactMutation();

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      id: currentContact?.id,
      name: newName ? newName : currentContact?.name,
      email: newEmail ? newEmail : currentContact?.email,
      phoneNumber: newPhone ? newPhone : currentContact?.phoneNumber,
    };

    await updateContact(data);

    toggleIsEditing();
    setNewName("");
    setNewEmail("");
    setNewPhone("");
  };

  return (
    <div
      className={`${isEditing ? "block" : "hidden"} fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50`}
    >
      <div className="mx-4 w-full rounded-lg bg-white p-8 md:max-w-md">
        <h2 className="text-lg font-semibold">Edit Contact</h2>

        <div className="mt-4">
          <form
            onSubmit={(e) => handleEdit(e)}
            className="flex flex-col items-center gap-y-2 p-4"
          >
            {/* Name Input */}
            <div className="relative flex min-h-[40px] w-full flex-col justify-center">
              <input
                type="text"
                value={newName}
                placeholder={currentContact ? currentContact.name : ""}
                id="newName"
                onChange={(e) => setNewName(e.target.value)}
                className="text-dark placeholder:text-place dark:bg-dark block w-full cursor-text rounded border border-gray-500 p-4 focus:outline-none dark:text-white"
              ></input>
            </div>
            {/* Email Input */}
            <div className="relative flex min-h-[40px] w-full flex-col justify-center">
              <input
                type="text"
                value={newEmail}
                placeholder={currentContact ? currentContact.email : ""}
                id="newEmail"
                onChange={(e) => setNewEmail(e.target.value)}
                className="text-dark placeholder:text-place dark:bg-dark block w-full cursor-text rounded border border-gray-500 p-4 focus:outline-none dark:text-white"
              ></input>
            </div>
            {/* Phone Number Input */}
            <div className="relative flex min-h-[40px] w-full flex-col justify-center">
              <input
                type="text"
                value={newPhone}
                placeholder={currentContact ? currentContact.phoneNumber : ""}
                id="newPhone"
                onChange={(e) => setNewPhone(e.target.value)}
                className="text-dark placeholder:text-place dark:bg-dark block w-full cursor-text rounded border border-gray-500 p-4 focus:outline-none dark:text-white"
              ></input>
            </div>
            <div className="mt-4 flex w-full flex-row justify-evenly">
              <Button
                type="button"
                size="lg"
                variant="destructive"
                onClick={() => toggleIsEditing()}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" variant="confirm">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

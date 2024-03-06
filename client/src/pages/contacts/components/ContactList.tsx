import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";

import { getContacts } from "../api/getContacts";
import { updateContact } from "../api/updateContact";
import { deleteContact } from "../api/deleteContact";

import { ContactContext } from "@/contexts/ContactContext";

import { Contact } from "../types";

export const ContactList = () => {
  const { contacts, setContacts } = useContext(ContactContext);
  const [currentContact, setCurrentContact] = useState<Contact | undefined>();
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  // Get all the contacts
  useEffect(() => {
    async function fetchContacts() {
      const allContacts = await getContacts();
      setContacts(allContacts);
    }

    fetchContacts();
  }, []);

  const handleEdit = async (e: React.FormEvent, id: string) => {
    e.preventDefault();

    const data = {
      name: newName ? newName : currentContact.name,
      email: newEmail ? newEmail : currentContact.email,
      phoneNumber: newPhone ? newPhone : currentContact.phone,
    };

    const newContact = await updateContact(id, data);

    const updatedContacts = contacts.map((contact: Contact) =>
      contact.id === id ? newContact : contact,
    );

    setContacts(updatedContacts);
    setCurrentContact(null);
  };

  const handleDelete = async (id: number | string) => {
    await deleteContact(id);

    setContacts(contacts.filter((contact: Contact) => contact.id !== id));
  };

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {contacts &&
          contacts.map((contact, index: number) => (
            <div
              key={index}
              className="flex flex-col justify-evenly gap-y-2 rounded-lg bg-gray-200 p-6"
            >
              <span className="text-2xl font-bold leading-tight">
                {contact.name}
              </span>
              <span className="font-md text-xl leading-tight">
                {contact.email}
              </span>
              <span className="font-md text-xl leading-tight">
                {contact.phoneNumber}
              </span>
              <div className="flex flex-row justify-end gap-x-2 mt-4">
                <Button onClick={() => setCurrentContact(contact)} variant="ghost">Edit</Button>
                <Button
                  onClick={() => handleDelete(contact.id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
      </div>
      <div
        className={`${currentContact ? "block" : "hidden"} fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50`}
      >
        <div className="mx-4 w-full rounded-lg bg-white p-8 md:max-w-md">
          <h2 className="text-lg font-semibold">Edit Contact</h2>

          <div className="mt-4">
            <form
              onSubmit={(e) => handleEdit(e, currentContact.id)}
              className="flex flex-col items-center gap-y-2 p-4"
            >
              {/* Name Input */}
              <div className="relative flex min-h-[40px] w-full flex-col justify-center">
                <input
                  type="text"
                  value={newName}
                  placeholder={currentContact ? currentContact.name : ""}
                  id="name"
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
                  id="email"
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
                  id="phone"
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="text-dark placeholder:text-place dark:bg-dark block w-full cursor-text rounded border border-gray-500 p-4 focus:outline-none dark:text-white"
                ></input>
              </div>
              <Button
                type="button"
                size="lg"
                onClick={() => setCurrentContact(null)}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";

import { getContacts } from "../api/getContacts";
import { updateContact } from "../api/updateContact";
import { deleteContact } from "../api/deleteContact";

import { ContactContext } from "@/contexts/ContactContext";

export const ContactList = () => {
  const { contacts, setContacts } = useContext(ContactContext);
  const [currentContact, setCurrentContact] = useState(null);
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

  const handleEdit = async (e, id) => {
    e.preventDefault();

    const data = {
      name: newName,
      email: newEmail,
      phoneNumber: newPhone,
    };

    const newContact = await updateContact(id, data);

    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? newContact : contact,
    );

    setContacts(updatedContacts);
    setCurrentContact(null);
  };

  const handleDelete = async (id) => {
    deleteContact(id);

    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <>
      <div className="my-4 flex flex-col gap-y-2">
        {contacts.length > 0 &&
          contacts.map((contact, index) => (
            <div
              key={index}
              className="flex flex-row justify-evenly gap-x-5 rounded-lg bg-gray-200 p-2"
            >
              <span className="text-2xl font-semibold leading-tight">
                {contact.name}
              </span>
              <span className="text-2xl font-semibold leading-tight">
                {contact.email}
              </span>
              <span className="text-2xl font-semibold leading-tight">
                {contact.phoneNumber}
              </span>
              <Button onClick={() => setCurrentContact(contact)}>Edit</Button>
              <Button
                onClick={() => handleDelete(contact.id)}
                variant="destructive"
              >
                Delete
              </Button>
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

import { useState } from "react";
import { Button } from "@/components/ui/button";

// import { getContacts } from "../api/getContacts";
// import { updateContact } from "../api/updateContact";
// import { deleteContact } from "../api/deleteContact";
// import { ContactContext } from "@/contexts/ContactContext";

// RTK Query
import {
  useContactsQuery,
  useDeleteContactMutation,
} from "@/redux/services/contacts";

import { Contact } from "../types";
import { EditContact } from "./EditContact";

export const ContactList = () => {
  // const { contacts, setContacts } = useContext(ContactContext);
  const [currentContact, setCurrentContact] = useState<Contact | undefined>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { data, error, isLoading, isSuccess } = useContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const startEdit = (contact: Contact) => {
    setIsEditing(true);
    setCurrentContact(contact);
  };

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
    setCurrentContact(undefined);
  };

  // Get all the contacts
  // useEffect(() => {
  //   async function fetchContacts() {
  //     const allContacts = await getContacts();
  //     setContacts(allContacts);
  //   }

  //   fetchContacts();
  // }, []);

  // const handleEdit = async (e: React.FormEvent, id: string) => {
  //   e.preventDefault();

  //   const data = {
  //     name: newName ? newName : currentContact.name,
  //     email: newEmail ? newEmail : currentContact.email,
  //     phoneNumber: newPhone ? newPhone : currentContact.phone,
  //   };

  //   const newContact = await updateContact(id, data);

  //   const updatedContacts = contacts.map((contact: Contact) =>
  //     contact.id === id ? newContact : contact,
  //   );

  //   setContacts(updatedContacts);
  //   setCurrentContact(undefined);
  //   setNewName("");
  //   setNewEmail("");
  //   setNewPhone("");
  // };

  // const handleDelete = async (id: number | string) => {
  //   await deleteContact(id);

  //   setContacts(contacts.filter((contact: Contact) => contact.id !== id));
  // };

  const handleDelete = async (id: number | string) => {
    await deleteContact(id);
  };

  return (
    <>
      {/* Contact list with edit and delete options */}
      {error && (
        <div className="h-[100px] w-[300px] bg-red-400 text-white">
          <p>An error occured!</p>
        </div>
      )}
      {isLoading && (
        <div className="h-[100px] w-[300px] bg-yellow-400 text-white">
          <p>An error occured!</p>
        </div>
      )}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isSuccess &&
          data.map((contact: Contact, index: number) => (
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
              <div className="mt-4 flex flex-row justify-end gap-x-2">
                <Button onClick={() => startEdit(contact)} variant="ghost">
                  Edit
                </Button>
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

      {/* Edit Contact */}
      <EditContact
        isEditing={isEditing}
        toggleIsEditing={toggleIsEditing}
        currentContact={currentContact}
      />
    </>
  );
};

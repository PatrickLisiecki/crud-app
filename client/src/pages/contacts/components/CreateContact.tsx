import { useState } from "react";
import { Button } from "@/components/ui/button";

// import { createContact } from "../api/createContact";
// import { ContactContext } from "@/contexts/ContactContext";

// RTQ Query
import { useAddContactMutation } from "@/redux/services/contacts";

interface CreateContactProps {
  isOpen: boolean;
  toggleIsOpen: Function;
}

export const CreateContact = ({ isOpen, toggleIsOpen }: CreateContactProps) => {
  // const { contacts, setContacts } = useContext(ContactContext);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [addContact, result] = useAddContactMutation();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const data = {
  //     name: name,
  //     email: email,
  //     phoneNumber: phone,
  //   };

  //   const newContact = await createContact(data);

  //   const newContacts = contacts.slice();
  //   newContacts.push(newContact);
  //   setContacts(newContacts);
  //   toggleIsOpen();
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      phoneNumber: phone,
    };

    await addContact(data);
    toggleIsOpen();
  };

  return (
    <div
      className={`${isOpen ? "block" : "hidden"} fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50`}
    >
      <div className="mx-4 w-full rounded-lg bg-white p-8 md:max-w-md">
        <h2 className="text-xl font-semibold">Create a Contact</h2>

        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col items-center gap-y-2"
        >
          {/* Name Input */}
          <div className="relative flex min-h-[40px] w-full flex-col justify-center">
            <input
              type="text"
              value={name}
              placeholder="John Smith"
              id="name"
              onChange={(e) => setName(e.target.value)}
              className="text-dark placeholder:text-place dark:bg-dark block w-full cursor-text rounded border border-gray-500 p-4 focus:outline-none dark:text-white"
            />
          </div>
          {/* Email Input */}
          <div className="relative flex min-h-[40px] w-full flex-col justify-center">
            <input
              type="text"
              value={email}
              placeholder="example@gmail.com"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="text-dark placeholder:text-place dark:bg-dark block w-full cursor-text rounded border border-gray-500 p-4 focus:outline-none dark:text-white"
            />
          </div>
          {/* Phone Number Input */}
          <div className="relative flex min-h-[40px] w-full flex-col justify-center">
            <input
              type="text"
              value={phone}
              placeholder="777-777-7777"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
              className="text-dark placeholder:text-place dark:bg-dark block w-full cursor-text rounded border border-gray-500 p-4 focus:outline-none dark:text-white"
            />
          </div>
          <div className="mt-4 flex w-full flex-row justify-evenly">
            <Button
              type="button"
              size="lg"
              variant="destructive"
              onClick={() => toggleIsOpen()}
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
  );
};

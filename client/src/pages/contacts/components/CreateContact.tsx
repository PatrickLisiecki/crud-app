import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";

import { createContact } from "../api/createContact";

import { ContactContext } from "@/contexts/ContactContext";

export const CreateContact = () => {
  const { setContacts } = useContext(ContactContext);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      phoneNumber: phone,
    };

    const newContact = await createContact(data);

    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  return (
    <div className="w-[350px] rounded-lg bg-gray-200 p-4 md:w-[500px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-y-2 p-4"
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
          ></input>
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
          ></input>
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
          ></input>
        </div>
        <Button type="submit" size="lg">
          Submit
        </Button>
      </form>
    </div>
  );
};

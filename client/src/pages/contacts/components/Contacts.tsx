import { CreateContact } from "./CreateContact";
import { ContactList } from "./ContactList";

export const Contacts = () => {
  return (
    <div className="flex h-screen w-full flex-col bg-gray-100 px-24 py-12">
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">Contacts</h1>
      <CreateContact />
      <ContactList />
    </div>
  );
};

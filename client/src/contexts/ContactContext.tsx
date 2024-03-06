import { createContext, useState } from "react";
import { Contact } from "@/pages/contacts/types";

const ContactContext = createContext();

const ContactContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  return (
    <ContactContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactContext.Provider>
  );
};

export { ContactContext, ContactContextProvider };
